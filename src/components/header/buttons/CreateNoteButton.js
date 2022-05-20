import {Link} from 'react-router-dom'


const CreateNoteButton = () => {
    return (
        <Link to={'/notes/create'} className={'button is-success'}>
            <span className={'icon'}>
                <i className={'fa fa-pen'} aria-hidden="true" />
            </span>
        </Link>
    )
}


export default CreateNoteButton
