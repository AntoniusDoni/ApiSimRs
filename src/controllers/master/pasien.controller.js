const db =  require("../../models");
const { sequelize } =  require("../../models");
const { Op } = require("sequelize");
const Pasien=db.pasiens;
const Penjawb=db.penanggung_jawab_pasiens
const Penjamin=db.pesien_penjamins
const Kelurahan=db.kelurahan;
const Kecamatan=db.kecamatan;
const Kabupaten=db.kabupaten_kota;
const Provinsi=db.provinsi;

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}
exports.listpasien = (req, res) => {
    var serachRm={is_active:1};
    var limit=600;
    if(req.body.searchrm||req.body.searchnama||req.body.searchAlamat||req.body.searchtgl_reg){

      if(req.body.searchrm!=""&&req.body.searchAlamat!=""&&req.body.searchnama!=""&&req.body.searchtgl_reg!=""){
            serachRm={
                is_active:1,
                no_rm:req.body.searchrm,
                nm_pasien:{[Op.like]:`%${req.body.searchnama}%`},
                alamat:{[Op.like]:`${req.body.searchAlamat}%`},
                ttgl_lahir:req.body.searchtgl_reg

            }  
        }else if(req.body.searchrm!=""&&req.body.searchAlamat!=""&&req.body.searchrm!=""){
            serachRm={
                is_active:1,
                no_rm:req.body.searchrm,
                nm_pasien:{[Op.like]:`%${req.body.searchnama}%`},
                alamat:{[Op.like]:`${req.body.searchAlamat}%`},
            }  
        }else if(req.body.searchtgl_reg!=""&&req.body.searchAlamat!=""){
            serachRm={
                is_active:1,
                alamat:{[Op.like]:`${req.body.searchAlamat}%`},
                nm_pasien:{[Op.like]:`%${req.body.searchnama}%`},
                ttgl_lahir:req.body.searchtgl_reg                
            }  
        }else if(req.body.searchAlamat!=""){
            serachRm={
                is_active:1,
                alamat:{[Op.like]:`${req.body.searchAlamat}%`},
                nm_pasien:{[Op.like]:`%${req.body.searchnama}%`},
                               
            }  
        }else if(req.body.searchtgl_reg!=""){
            serachRm={
                is_active:1,
                ttgl_lahir:req.body.searchtgl_reg,   
                nm_pasien:{[Op.like]:`%${req.body.searchnama}%`},
                               
            }  
        }else if(req.body.searchrm===""){
            
            serachRm={
                is_active:1,             
                nm_pasien:{[Op.like]:`${req.body.searchnama}%`},                              
            }  
        }
        else{
            serachRm={
                is_active:1,
                no_rm:req.body.searchrm,
                nm_pasien:{[Op.like]:`%${req.body.searchnama}%`},                              
            }  
        }
        limit=1000000
    }
    // console.log(serachRm);
    Pasien.findAll({
        where:serachRm,
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
                                    include:[{model:Provinsi,
                                        // require:true,
                                    }]
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
        ],
        limit:limit,
        order: [["no_rm","DESC"]]
    }).then(
        pasien=>{
            res.status(200).send(pasien)
        }
    ).catch(err => {
        res.status(500).send({ message: err.message });
    })
}
exports.getlastrm = (req, res) => {
    Pasien.findAndCountAll({
        limit: 1,
        attributes: ['no_rm'],
        order: [[sequelize.literal('no_rm'), `DESC`]]
    }).then(no_rm => {
        if (!no_rm) {
            order
        } else {
            
            req.app.get('io').local.emit("no_rm",no_rm);
            res.status(200).send({
                no_rm
            })
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
  }
  exports.updatepasien=(async(req,res)=>{
     Pasien.update({
        nm_pasien:req.body.nm_pasien,
        nik:req.body.nik,
        alamat:req.body.alamat,
        ttgl_lahir:req.body.ttgl_lahir,
        no_tlp:req.body.no_tlp,
        tempat_lahir:req.body.tempat_lahir,
        id_kelurahan:req.body.idkelurahan,
        sst_perkawinan:req.body.sst_perkawinan,
        gol_darah:req.body.gol_darah,
        pekerjaan:req.body.pekerjaan,
        nm_ibu:req.body.nm_ibu,
        jk:req.body.jk,
        umur:req.body.umur,
    },{
        where:{
            no_rm:req.body.no_rm
        }
    }).then(pasien=>{
        Pasien.findOne({
            where:{no_rm:req.body.no_rm,is_active:1},
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
                                    {model:Kabupaten,required:true,include:[{model:Provinsi,required:true,}]}
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
        }).then(
            pasien=>{            
                res.status(200).send(pasien)
            }
        ).catch(err => {
            res.status(500).send({ message: err.message });
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
  })
  exports.addpasien = (async(req, res) => {
    // console.log(req.body.no_rm)
    await Pasien.create({
        no_rm:req.body.no_rm,
        nm_pasien:req.body.nm_pasien,
        nik:req.body.nik,
        alamat:req.body.alamat,
        ttgl_lahir:req.body.ttgl_lahir,
        no_tlp:req.body.no_tlp,
        tempat_lahir:req.body.tempat_lahir,
        id_kelurahan:req.body.idkelurahan,
        sst_perkawinan:req.body.sst_perkawinan,
        gol_darah:req.body.gol_darah,
        pekerjaan:req.body.pekerjaan,
        nm_ibu:req.body.nm_ibu,
        jk:req.body.jk,
        umur:req.body.umur,
        is_active:1
    })
    await Penjawb.create({
        no_rm: req.body.no_rm,
        nm_penanggung: req.body.nm_penanggung,
        tgl_lahir: req.body.tgl_lahir,
        alamat: req.body.alamatpenjab,
        no_tlp: req.body.no_tlppenjab,
        hub_pasien: req.body.hub_pasien,
        no_ktp: req.body.no_ktp,
        id_kelurahan: req.body.id_kelurahanPen
    })
    Pasien.findOne({
        where:{no_rm:req.body.no_rm,is_active:1},
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
                                {model:Kabupaten,required:true,include:[{model:Provinsi,required:true,}]}
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
    }).then(
        pasien=>{
            req.app.get('io').local.emit("newRM",pasien.no_rm);
            req.app.get('io').local.emit("pasien",pasien);
            res.status(200).send(pasien)
        }
    ).catch(err => {
        res.status(500).send({ message: err.message });
    })

  })
  exports.deletpasien=(req,res)=>{
    Pasien.update({
        is_active:0,
    },{
        where:{
            no_rm:req.body.no_rm
        }
    }).then(() => {
        res.json({ delete:true })
    }).catch(err => res.status(400).json({ message: req.body }))

  }
