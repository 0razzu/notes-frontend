import {FormattedMessage} from 'react-intl'
import Comment from './Comment'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../../utils/fetchFromAPI'
import distributeErrors from '../../../utils/distributeErrors'
import AddComment from '../../forms/AddComment'
import Modal from '../../atoms/Modal'
import DeleteCurrentRevisionComments from '../../forms/DeleteCurrentRevisionComments'
import {connect} from 'react-redux'


const NoteComments = ({user, note}) => {
    const isSuper = user.super
    const isNoteAuthor = user.id === note.authorId
    const [comments, setComments] = useState([])
    const [currentRevComments, setCurrentRevComments] = useState([])
    const [oldComments, setOldComments] = useState([])
    const [addCommentDialogIsActive, setAddCommentDialogIsActive] = useState(false)
    const [deleteCommentsDialogIsActive, setDeleteCommentsDialogIsActive] = useState(false)


    useEffect(() => {
        if (note?.revisionId)
            getFromAPI(`/notes/${note.id}/comments`)
                .then(response => setComments(response))
                .catch(e => distributeErrors(e))
    }, [note?.id, note.revisionId])


    useEffect(() => {
        setCurrentRevComments(comments.filter(comment => comment.revisionId === note.revisionId))
        setOldComments(comments.filter(comment => comment.revisionId !== note.revisionId))
    }, [comments, note.revisionId])


    const onEditComment = id => newBody => {
        setComments(comments.map(comment => {
            if (comment.id === id)
                return {...comment, body: newBody}

            return comment
        }))
    }


    const onDeleteComment = id => () => setComments(comments.filter(comment => comment.id !== id))


    return (
        <>
            <article className={'section content mt-6 has-background-white-bis'}>
                <h3 className={'title'}><FormattedMessage id="comments" /></h3>

                {currentRevComments.length > 0 &&
                    <section className={'content'}>
                        <h4><FormattedMessage id="current_rev_comments" /></h4>

                        {currentRevComments.map(comment =>
                            <Comment key={comment.id}
                                     comment={comment}
                                     onEdit={user.id === comment.authorId && onEditComment(comment.id)}
                                     onDelete={(isNoteAuthor || isSuper || user.id === comment.authorId)
                                         && onDeleteComment(comment.id)} />
                        )}
                    </section>
                }

                <div className={'buttons'}>
                    <button className={'button is-link is-outlined'}
                            onClick={() => setAddCommentDialogIsActive(true)}>
                                    <span className={'icon is-small'}>
                                        <i className={'fa fa-pen'} aria-hidden="true" />
                                    </span>
                        <span><FormattedMessage id="add" /></span>
                    </button>

                    {(isNoteAuthor || isSuper) &&
                        <button className={'button is-danger is-outlined'}
                                onClick={() => setDeleteCommentsDialogIsActive(true)}>
                                        <span className={'icon is-small'}>
                                            <i className={'fa fa-trash'} aria-hidden="true" />
                                        </span>
                            <span><FormattedMessage id="delete" /></span>
                        </button>
                    }
                </div>

                {oldComments.length > 0 &&
                    <section className={'content'}>
                        <h4><FormattedMessage id="old_comments" /></h4>

                        {oldComments.map(comment =>
                            <Comment key={comment.id}
                                     comment={comment}
                                     onEdit={user.id === comment.authorId && onEditComment(comment.id)}
                                     onDelete={(isNoteAuthor || isSuper || user.id === comment.authorId)
                                         && onDeleteComment(comment.id)}
                                     showRevId />
                        )}
                    </section>
                }
            </article>

            <Modal isVisible={addCommentDialogIsActive} setIsVisible={setAddCommentDialogIsActive}>
                <AddComment noteId={note.id}
                            currentRevComments={currentRevComments}
                            setCurrentRevComments={setCurrentRevComments}
                            setIsVisible={setAddCommentDialogIsActive} />
            </Modal>

            {(isNoteAuthor || isSuper) &&
                <Modal isVisible={deleteCommentsDialogIsActive}
                       setIsVisible={setDeleteCommentsDialogIsActive}>
                    <DeleteCurrentRevisionComments id={note.id}
                                                   removeCurrentComments={() =>
                                                       setComments(comments.filter(comment =>
                                                           comment.revisionId !== note.revisionId))
                                                   }
                                                   setIsVisible={setDeleteCommentsDialogIsActive} />
                </Modal>
            }
        </>
    )
}


const mapStateToProps = state => ({
    user: state.user,
})


export default connect(mapStateToProps)(NoteComments)
