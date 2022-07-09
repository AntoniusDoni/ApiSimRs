const db =  require("../models");
const { sequelize } =  require("../models");
const { Op } = require("sequelize");
const Registrasi=db.registrases;
const Pasien=db.pasiens;
const Penjawb=db.penanggung_jawab_pasiens
const Penjamin=db.pesien_penjamins
const Kelurahan=db.kelurahan;
const Kecamatan=db.kecamatan;
const Kabupaten=db.kabupaten_kota;
const Provinsi=db.provinsi;
const Poli=db.polis;
const Dokter=db.dokters;
exports.addRegistrasi = (async(req, res) => {
   await Registrasi.create({
        no_reg: req.body.no_reg,
        no_rm: req.body.no_rm,
        tgl_reg: req.body.tgl_reg,
        kode_dokter: req.body.kode_dokter,
        kode_poli: req.body.kode_poli,
        idiks: req.body.idiks,
        no_kartu: req.body.no_kartu,
        stts_daftar: req.body.stts_daftar,
        stts_bayar: req.body.stts_bayar,
        stts_rawat: req.body.stts_rawat,
        stts_periksa: req.body.stts_periksa,
        umurdaftar: req.body.umurdaftar
    })
    Registrasi.findOne({
        where:{no_reg: req.body.no_reg},
        include:[
            {
                model: Pasien,
                required: true, 
                include:[
                    {
                        model: Penjawb,
                        required: true, 
                        include:[
                            {
                                model: Kelurahan,
                                required: true,
                                include:[
                                    {
                                    model:Kecamatan,
                                    required:true,
                                    include:[
                                        {
                                            model:Kabupaten,
                                            required:true,
                                            include:[{model:Provinsi,require:true,}]
                                        }
                                    ]
                                    }
                                ]             
                            }
                        ]
                    },
                    {
                        model: Kelurahan,
                        required: true,
                        include:[
                            {
                            model:Kecamatan,
                            required:true,
                            include:[
                                {model:Kabupaten,required:true,include:[{model:Provinsi,required:true,}]}
                            ]
                            }
                        ]             
                    }
                ]
            },
            {
                model:Poli,
                required: true,
                attributes:['nama_poli']
            },
            {
                model:Dokter,
                required: true,
                attributes:['nm_dokter']
            }
        ]
    }).then(register=>{
        req.app.get('io').local.emit("register",register);
        res.status(200).send(register)
    })
})
exports.updateregpasien=(req,res)=>{
    Registrasi.update({
        
        no_rm: req.body.no_rm,
        tgl_reg: req.body.tgl_reg,
        kode_dokter: req.body.kode_dokter,
        kode_poli: req.body.kode_poli,
        idiks: req.body.idiks,
        no_kartu: req.body.no_kartu,
        stts_daftar: req.body.stts_daftar,
        stts_bayar: req.body.stts_bayar,
        stts_rawat: req.body.stts_rawat,
        stts_periksa: req.body.stts_periksa,
        umurdaftar: req.body.umurdaftar
    },{
        where:{no_reg: req.body.no_reg}
    }).then(register=>{
        Registrasi.findOne({
            where:{no_reg: req.body.no_reg},
            include:[
                {
                    model: Pasien,
                    required: true, 
                    include:[
                        {
                            model: Penjawb,
                            required: true, 
                            include:[
                                {
                                    model: Kelurahan,
                                    required: true,
                                    include:[
                                        {
                                        model:Kecamatan,
                                        required:true,
                                        include:[
                                            {
                                                model:Kabupaten,
                                                required:true,
                                                include:[{model:Provinsi,required:true,}]
                                            }
                                        ]
                                        }
                                    ]             
                                }
                            ]
                        },
                        {
                            model: Kelurahan,
                            required: true,
                            include:[
                                {
                                model:Kecamatan,
                                required:true,
                                include:[
                                    {model:Kabupaten,required:true,include:[{model:Provinsi,required:true,}]}
                                ]
                                }
                            ]             
                        }
                    ]
                },
                {
                    model:Poli,
                    required: true,
                    attributes:['nama_poli']
                },
                {
                    model:Dokter,
                    required: true,
                    attributes:['nm_dokter']
                }
            ]
        }).then(register=>{
            req.app.get('io').local.emit("updateregister",register);
            res.status(200).send(register)
        })
    })
}
exports.getLastReg=(req,res)=>{
    
    Registrasi.findAndCountAll({
        where:{tgl_reg:req.body.tgl_reg},
        limit: 1,
        attributes: ['no_reg'],
        order: [["no_reg","DESC"]]
    }).then(no_reg => {
        if (!no_reg) {
            no_reg
        } else {           
            req.app.get('io').local.emit("no_reg",no_reg);
            res.status(200).send({
                no_reg
            })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.getlistregistrasi=(req,res)=>{
   
    var condition={tgl_reg:req.body.tgl_reg,stts_rawat:req.body.stts_rawat}
    if(req.body.kode_poli!==""){
        condition={tgl_reg:req.body.tgl_reg,kode_poli:req.body.kode_poli,stts_rawat:req.body.stts_rawat}
    }
    let pasienCondition
    if(req.body.no_rm!==""){
        pasienCondition={where:{no_rm:{
            [Op.like]:`%${req.body.no_rm}%`
        }}}
    }
    Registrasi.findAll({
        where:condition,
        include:[
            {
                model:Poli,
                required: true,
                attributes:['nama_poli']
            },
            {
                model:Dokter,
                required: true,
                attributes:['nm_dokter']
            },
            {
                model: Pasien,
                where:{no_rm:{
                    [Op.like]:`%${req.body.no_rm}%`
                    },
                    is_active:1
                },
                required: true, 
                include:[
                    {
                        model: Penjawb,
                        // required: true, 
                        include:[
                            {
                                model: Kelurahan,
                                // required: true,
                                include:[
                                    {
                                    model:Kecamatan,
                                    // required:true,
                                    include:[
                                        {
                                            model:Kabupaten,
                                            // required:true,
                                            include:[{model:Provinsi,required:true,}]
                                        }
                                    ]
                                    }
                                ]             
                            }
                        ]
                    },
                    {
                        model: Kelurahan,
                        required: true,
                        include:[
                            {
                            model:Kecamatan,
                            required:true,
                            include:[
                                {model:Kabupaten,required:true,include:[{model:Provinsi,required:true,}]}
                            ]
                            }
                        ]             
                    }
                ]
            }
           
        ],
        attributes:['no_reg','no_rm','tgl_reg','kode_dokter','kode_poli','idiks','no_kartu','stts_daftar','stts_bayar','stts_rawat','stts_periksa','umurdaftar'],
        limit:1000,
        order: [["no_reg","DESC"]]
    }).then(register=>{
        req.app.get('io').local.emit("registrasi",register);
        res.status(200).send(register)
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
exports.deleteReg=(req,res)=>{
    
    Registrasi.destroy({ where: { no_reg:  req.body.id } }).then(delRegis=>{
        req.app.get('io').local.emit("delregistrasi",{status:delRegis,no_reg:req.body.no_reg});
    })
    
}