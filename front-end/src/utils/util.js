import { toast } from 'react-toastify';

const TOP_LEVEL_DOC = "api_keys"
const LOW_LEVEL_DOC = "my_apps"

function generateKey() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i <= 20; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


const notify = (message, TYPE) => toast.info(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: TYPE,
});

export {
    TOP_LEVEL_DOC,
    LOW_LEVEL_DOC,
    generateKey,
    notify
}