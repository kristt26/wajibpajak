<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Wajibpajak_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('mylib');

    }

    public function select($id = null)
    {
        if ($id == null) {
            $data = $this->db->get('wajibpajak')->result();
            foreach ($data as $key => $value) {
                $value->usaha = $this->db->get_where('usaha', ['wajibpajakid' => $value->id])->row_array();
                $value->usaha['kategori'] = $this->db->get_where('kategori', ['id' => $value->usaha['kategoriid']])->row_array();
            }
            return $data;
        } else {
            $data = $this->db->get_where('wajibpajak', ['id' => $id])->row_array();
            $data['usaha'] = $this->db->get_where('usaha', ['wajibpajakid' => $data['id']])->row_array();
            $data['usaha']['kategori'] = $this->db->get_where('kategori', ['id' => $data['usaha']['kategoriid']])->row_array();
            return $data;
        }
    }
    public function insert($data)
    {
        $this->db->trans_begin();
        $itemWajibPajak = [
            'nik' => $data['nik'],
            'nama' => $data['nama'],
            'jk' => $data['jk'],
            'nowajibpajak' => $data['nowajibpajak'],
            'alamat' => $data['alamat'],
            'kontak' => $data['kontak'],
            'email' => $data['email'],
            'petugasid' => $this->session->userdata('petugasid'),
        ];
        $this->db->insert('wajibpajak', $itemWajibPajak);
        $data['id'] = $this->db->insert_id();
        $itemusaha = [
            'nama' => $data['usaha']['nama'],
            'alamat' => $data['usaha']['alamat'],
            'lat' => $data['usaha']['lat'],
            'long' => $data['usaha']['long'],
            'kategoriid' => $data['usaha']['kategoriid'],
            'wajibpajakid' => $data['id'],
            'status' => $data['usaha']['status'],
            'luas' => $data['usaha']['luas'],
            'jenisbangunan' => $data['usaha']['jenisbangunan'],
            'statustempatusaha' => $data['usaha']['statustempatusaha'],
            'jumlahpegawai' => $data['usaha']['jumlahpegawai'],
            'distrik' => $data['usaha']['distrik'],
            'gambar' => isset($data['usaha']['gambar']['base64']) ? $this->mylib->decodebase64($data['usaha']['gambar']['base64'], 'foto') : $data['usaha']['gambar'],
        ];
        $this->db->insert('usaha', $itemusaha);
        $data['usaha']['id'] = $this->db->insert_id();
        if ($this->db->trans_status()) {
            $this->db->trans_commit();
            return $data;
        } else {
            $this->db->trans_rollback();
            return false;
        }

    }
    public function update($data)
    {
        $this->db->trans_begin();
        $itemusaha = [
            'nama' => $data['usaha']['nama'],
            'alamat' => $data['usaha']['alamat'],
            'lat' => $data['usaha']['lat'],
            'long' => $data['usaha']['long'],
            'kategoriid' => $data['usaha']['kategoriid'],
            'wajibpajakid' => $data['id'],
            'status' => $data['usaha']['status'],
            'luas' => $data['usaha']['luas'],
            'jenisbangunan' => $data['usaha']['jenisbangunan'],
            'statustempatusaha' => $data['usaha']['statustempatusaha'],
            'jumlahpegawai' => $data['usaha']['jumlahpegawai'],
            'distrik' => $data['usaha']['distrik'],
        ];
        $this->db->where('id', $data['usaha']['id']);
        $this->db->update('usaha', $itemusaha);
        $itemWajibPajak = [
            'nik' => $data['nik'],
            'nama' => $data['nama'],
            'jk' => $data['jk'],
            'nowajibpajak' => $data['nowajibpajak'],
            'alamat' => $data['alamat'],
            'kontak' => $data['kontak'],
            'email' => $data['email'],
            'petugasid' => $this->session->userdata('petugasid'),
        ];
        $this->db->where('id', $data['id']);
        $this->db->update('wajibpajak', $itemWajibPajak);
        if ($this->db->trans_status()) {
            $this->db->trans_commit();
            return $data;
        } else {
            $this->db->trans_rollback();
            return false;
        }
    }
    public function delete($id)
    {
        $this->db->where('id', $id);
        return $this->db->delete('wajibpajak');
    }

}

/* End of file Kategori_model.php */
