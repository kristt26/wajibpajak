<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Laporan extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Laporan_model');

    }

    public function index()
    {
        $result['result'] = $this->Laporan_model->selectTempat();
        if($this->input->get('set')=='tempat'){
            $data['content'] = $this->load->view('laporan/tempat', $result, true);
            $this->load->view('_shared/layout', $data);
        }else{
            $data['content'] = $this->load->view('laporan/rekap', $result, true);
            $this->load->view('_shared/layout', $data);
        }
    }

    public function get($id = null)
    {
        $result = $this->Laporan_model->select($id);
        echo json_encode($result);
    }

    public function add()
    {
        $data = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $result = $this->Laporan_model->insert($data);
        echo json_encode($result);
    }

    public function update()
    {
        $data = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $result = $this->Laporan_model->update($data);
        echo json_encode($result);
    }

    public function delete($id)
    {
        $result = $this->Laporan_model->delete($id);
        echo json_encode($result);
    }
}
