<?php

defined('BASEPATH') or exit('No direct script access allowed');

class User_model extends CI_Model
{

    public function select($data)
    {
        $password = md5($data['password']);
        $username = $data['username'];
        return $this->db->query("SELECT
            `user`.*,
            `petugas`.`id` AS `petugasid`,
            `petugas`.`nip`,
            `petugas`.`nama`,
            `petugas`.`alamat`,
            `petugas`.`kontak`,
            `petugas`.`email`
        FROM
            `user`
            LEFT JOIN `petugas` ON `user`.`id` = `petugas`.`userid` WHERE user.username='$username' and user.password='$password'")->row_array();
    }
    public function insert($data)
    {
        $result = $this->db->insert('kategori', $data);
        $data['id'] = $this->db->insert_id();
        if ($result) {
            return $data;
        } else {
            return false;
        }

    }
    public function update($data)
    {
        $item = [
            'kategori' => $data['kategori'],
        ];
        $this->db->where('id', $data['id']);
        $this->db->update('kategori', $item);
        return $item;
    }
    public function delete($id)
    {
        $this->db->where('id', $id);
        return $this->db->delete('kategori');
    }

}

/* End of file Kategori_model.php */
