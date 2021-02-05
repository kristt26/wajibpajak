<?php

defined('BASEPATH') or exit('No direct script access allowed');

class home extends CI_Controller
{

    public function index()
    {
        $this->load->model('Home_model');
        $result['result'] = $this->Home_model->select();
        $content['content'] = $this->load->view('home/index', $result, true);
        $this->load->view('_shared/layout', $content);
    }

}

/* End of file home.php */
