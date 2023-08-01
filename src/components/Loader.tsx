import '../styles/loader.css';
import {Box} from '@mui/material';

const Loader = () => {
    return (
        <Box display='flex' width='100%' justifyContent='center' alignItems='center' height='100vh'>
            <div className='lds-default'>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
                <div style={{ background: "#53c28b" }}></div>
            </div>
        </Box>
    );
};

export default Loader;