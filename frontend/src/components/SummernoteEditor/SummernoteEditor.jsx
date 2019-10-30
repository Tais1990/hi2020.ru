import React from 'react'
import PropTypes from 'prop-types';
import styles from './SummernoteEditor.scss';

import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; // import styles
import 'react-summernote/lang/summernote-ru-RU'; // you can import any other locale

// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

class SummernoteEditor extends React.Component {
    constructor(props) {
        super(props);
        this.uniqueEditor;        
    }
    // прикрепляем картинку к основному потоку данных
    onImageUpload = (fileList) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            this.uniqueEditor.insertImage(reader.result);
        }
        reader.readAsDataURL(fileList[0]);
    }    
    render() {
        let {data, onChange} = this.props;        
        return ( 
            <ReactSummernote ref={el => this.uniqueEditor = el}
                value = {data}
                options = {{
                    lang: 'ru-RU',
                    height: 350,
                    dialogsInBody: true,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['insert', ['link', 'picture' ]],
                    ]
                }}
                onChange={onChange}
                onImageUpload={this.onImageUpload}
            />
        )
    }
}
SummernoteEditor.propTypes = {   
    data: PropTypes.string,
    onChange: PropTypes.func
};
export default SummernoteEditor;