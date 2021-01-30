<?php

defined('BASEPATH') or exit('No direct script access allowed');

class User_model extends CI_Model
{
    public function check()
    {
        $data = $this->db->get("user")->result();
        if (count($data) == 0) {
            $role = ['Admin', 'Petugas'];
            $this->db->trans_begin();
            $idrole;
            foreach ($role as $key => $value) {
                $this->db->insert('role', ['role' => $value]);
                $idrole = $this->db->insert_id();
                if ($value == 'Admin') {
                    $roleid = $idrole;
                }

            }
            $this->db->insert('user', ['username' => 'admin@mail.com', 'password' => md5('admin')]);
            $iduser = $this->db->insert_id();
            $this->db->insert('userrole', ['roleid' => $idrole, 'userid' => $iduser]);
            if ($this->db->trans_status()) {
                $this->db->trans_commit();
            } else {
                $this->db->trans_rollback();
            }
        }
    }

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
            `petugas`.`email`,
            `role`.`role`
        FROM
            `user`
            LEFT JOIN `petugas` ON `user`.`id` = `petugas`.`userid`
            LEFT JOIN `userrole` ON `userrole`.`userid` = `user`.`id`
            LEFT JOIN `role` ON `role`.`id` = `userrole`.`roleid` WHERE user.username='$username' and user.password='$password'")->row_array();
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
