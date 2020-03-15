import Axios from 'axios';

const base_url = 'http://127.0.0.1:7000/'

const API = {
    getdata: (term) => {
        return Axios.get(base_url+ term);
    },
}

export default API