<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Laporan_model extends CI_Model {

    public function selectTempat()
    {
        $distrik = (object)[(object)['distrik'=>'Jayapura Utara'], (object)['distrik'=>'Jayapura Selatan'], (object)['distrik'=>'Abepura'], (object)['distrik'=>'Muara Tami'], (object)['distrik'=>'Heram']];
        foreach ($distrik as $key => $itemdistrik) {
            $itemdistrik->kategori = $this->db->get('kategori')->result_array();
            $itemdistrik->colspan = count($itemdistrik->kategori);
            foreach ($itemdistrik->kategori as $keyusaha => $itemkategori) {
                $itemdistrik->kategori[$keyusaha]['usaha'] = $this->db->get_where('usaha', ['kategoriid'=>$itemkategori['id'], 'distrik'=>$itemdistrik->distrik])->result_array();
                $itemdistrik->kategori[$keyusaha]['colspan'] = count($itemdistrik->kategori[$keyusaha]['usaha']);
                $itemdistrik->colspan += $itemdistrik->kategori[$keyusaha]['colspan'];
            }
        }
        return $distrik;
    }

}

