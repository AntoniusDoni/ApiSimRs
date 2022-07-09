const { authJwt } = require("../middleware");
const Provinsi = require('../controllers/master/provinsi.controller')
const Kabupaten = require('../controllers/master/kabupaten.controller')
const Kecamatan = require('../controllers/master/kecamatan.controller')
const Kelurahan = require('../controllers/master/kelurahan.controller')
const Bangsal=require('../controllers/master/bangsal.controller')
const Kamar=require('../controllers/master/kamar.controller')
const Poli=require('../controllers/master/poli.controller')
const Jadwal=require('../controllers/master/jadwal.controller')
const Penjamin=require('../controllers/master/penjamin.controller')
const Iks=require('../controllers/master/iks.controller')
const Dokter=require('../controllers/master/dokter.controller')
const UserMenu = require('../controllers/master/userMenu.controller')
const Pasien= require('../controllers/master/pasien.controller')
const Registrasi=require('../controllers/registrasi.controller')
const Tindakan=require('../controllers/master/tindakan.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    // userMenu
    app.post(
        "/api/user/getlistMenu/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        UserMenu.getlistMenu
    );
    // provinsi
    app.post(
        "/api/master/addprovinsi",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Provinsi.addprovinsi
    );
    app.get(
        "/api/master/getlistprovinsi/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Provinsi.getlistprovinsi
    );
    app.post(
        "/api/master/editprovinsi",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Provinsi.editprovinsi
    );
    app.delete(
        "/api/master/deleteprovinsi/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Provinsi.deleteprovinsi
    );
    // kabupaten
    app.post(
        "/api/master/addkabupaten",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kabupaten.addkabupaten
    );

    app.get(
        "/api/master/getlistkabupaten/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kabupaten.getlistkabupaten
    );
    app.post(
        "/api/master/getlistkabupatenbyprop",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kabupaten.getlistkabupatenbyidpro
    );
    app.post(
        "/api/master/editkabupaten",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kabupaten.editkabupaten
    );
    app.delete(
        "/api/master/deletekabupaten/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kabupaten.deletekabupaten
    );
    // kecamatan
    app.post(
        "/api/master/addkecamatan",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kecamatan.addkecamatan
    );
    app.get(
        "/api/master/getlistkecamatan/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kecamatan.getlistkecamatan
    );
    app.post(
        "/api/master/getlistkecamatanbyidkab",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kecamatan.getlistkecamatanbyidkab
    );
    app.post(
        "/api/master/editkecamatan",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kecamatan.editkecamatan
    );
    app.delete(
        "/api/master/deletekecamatan/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kecamatan.deletekecamatan
    );
    // kelurahan
    app.post(
        "/api/master/addkelurahan",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kelurahan.addkelurahan
    );
    app.get(
        "/api/master/getlistkelurahan/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kelurahan.getlistkelurahan
    );
    app.post(
        "/api/master/getlistkelurahanbyidkec",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kelurahan.getlistkelurahanbyidkec
    );
    app.post(
        "/api/master/editkelurahan",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kelurahan.editkelurahan
    );
    app.delete(
        "/api/master/deletekelurahan/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kelurahan.deletekelurahan
    );
    // bangsal
    app.post(
        "/api/master/addbangsal",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Bangsal.addbangsal
    );
    app.get(
        "/api/master/getlistbangsal",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Bangsal.getlistbangsal
    );
    app.post(
        "/api/master/editbangsal",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Bangsal.editbangsal
    );
    app.delete(
        "/api/master/deletebangsal/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Bangsal.deletebangsal
    );
    // kamar
    app.post(
        "/api/master/addkamar",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kamar.addkamar
    );
    app.get(
        "/api/master/getlistkamar/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kamar.getlistkamar
    );
    app.post(
        "/api/master/editkamar",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kamar.editkamar
    );
    app.delete(
        "/api/master/deletekamar/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Kamar.deletekamar
    );
    // dokter
    app.post(
        "/api/master/adddokter",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Dokter.adddokter
    );
    app.get(
        "/api/master/getlistdokter/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Dokter.getlistdokter
    );
    app.post(
        "/api/master/getlistdokterbypolijadwal",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Dokter.getlistdokterbypolijadwal
    );
    app.post(
        "/api/master/editdokter",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Dokter.editdokter
    );
    app.delete(
        "/api/master/deletedokter/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Dokter.deletedokter
    );
    // jadwal
    app.post(
        "/api/master/addjadwal",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Jadwal.addjadwal
    );
    app.get(
        "/api/master/getlistjadwal/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Jadwal.getlistjadwal
    );
    app.post(
        "/api/master/editjadwal",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Jadwal.editjadwal
    );
    app.delete(
        "/api/master/deletejadwal/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Jadwal.deletejadwal
    );
    // poli
    app.post(
        "/api/master/addpoli",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Poli.addpoli
    );
    app.get(
        "/api/master/getlistpoli/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Poli.getlistpoli
    );
    app.post(
        "/api/master/editpoli",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Poli.editpoli
    );
    app.delete(
        "/api/master/deletepoli/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Poli.deletepoli
    );
    // penjamin
    app.post(
        "/api/master/addpenjamin",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Penjamin.addpenjamin
    );
    app.get(
        "/api/master/getlistpenjamin/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Penjamin.getlistpenjamin
    );
    app.post(
        "/api/master/editpenjamin",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Penjamin.editpenjamin
    );
    app.delete(
        "/api/master/deletepenjamin/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Penjamin.deletepenjamin
    );
    // iks
    app.post(
        "/api/master/addiks",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Iks.addiks
    );
    app.get(
        "/api/master/getlistiks/",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Iks.getlistiks
    );
    app.post(
        "/api/master/getlistiksByIdPenjamin",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Iks.getlistiksByIdPenjamin
    );
    app.post(
        "/api/master/editiks",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Iks.editiks
    );
    app.delete(
        "/api/master/deleteiks/:id",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Iks.deleteiks
    );
        // pasien
        app.get(
            "/api/master/getlistpasien/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Pasien.listpasien
        );
        app.post(
            "/api/master/getfilterlistpasien/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Pasien.listpasien
        );
        app.get(
            "/api/master/getlastrm/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Pasien.getlastrm
        );
        app.post(
            "/api/master/addpasien",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Pasien.addpasien
        );
        app.post(
            "/api/master/updatepasien",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Pasien.updatepasien
        ); 
        app.post(
            "/api/master/deletpasien",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Pasien.deletpasien
        ); 
        // Registrasi
        app.post("/api/master/addregpasien",
        [authJwt.verifyToken, authJwt.isSuperOrAdmin],
        Registrasi.addRegistrasi) 

        app.post(
            "/api/master/getlastreg/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Registrasi.getLastReg
        );
        app.post(
            "/api/master/getlistregistrasi/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Registrasi.getlistregistrasi
        );  
        app.post(
            "/api/master/updateregpasien/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Registrasi.updateregpasien
        );   
        app.post(
            "/api/master/deletereg/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Registrasi.deleteReg
          )
// Tindakan
          app.post(
            "/api/master/addTindakan",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Tindakan.addTindakan
        );
        app.get(
            "/api/master/getlistTindakan/",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Tindakan.getlistTindakan
        );
        app.post(
            "/api/master/editTindakan",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Tindakan.editTindakan
        );
        app.delete(
            "/api/master/deleteTindakan/:id",
            [authJwt.verifyToken, authJwt.isSuperOrAdmin],
            Tindakan.deleteTindakan
        );
        
}