<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Home_model extends CI_Model
{
    public function select()
    {
        return $this->db->query("SELECT
            (SELECT COUNT(*) FROM user)as pengguna,
            (SELECT COUNT(*) FROM petugas) as petugas,
            (SELECT COUNT(*) FROM usaha) as usaha,
            (SELECT COUNT(*) FROM kategori) as kategori")->row_object();
    }
}

/* End of file Home_model.php */
