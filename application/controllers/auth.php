<?php

defined('BASEPATH') or exit('No direct script access allowed');

class auth extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('User_model');
    }

    public function index()
    {
        $this->load->view('login');
    }

    public function login()
    {
        $data = json_decode($this->security->xss_clean($this->input->raw_input_stream), true);
        $result = $this->User_model->select($data);
        if (count($result) > 0) {
            $result['is_login'] = true;
            $this->session->set_userdata($result);
            echo json_encode($result);
        } else {
            echo json_encode([]);
        }
    }

}

/* End of file auth.php */
