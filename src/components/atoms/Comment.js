import {FormattedMessage, useIntl} from 'react-intl'
import {nanoid} from 'nanoid'
import {useEffect, useState} from 'react'
import {getFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import classNames from 'classnames'
import Modal from './Modal'
import EditComment from '../forms/EditComment'
import DeleteComment from '../forms/DeleteComment'


const Comment = ({comment, showRevId, onEdit, onDelete}) => {
    const intl = useIntl()
    const [authorLogin, setAuthorLogin] = useState()
    const [editDialogIsActive, setEditDialogIsActive] = useState(false)
    const [deleteDialogIsActive, setDeleteDialogIsActive] = useState(false)


    useEffect(() => {
        if (!authorLogin)
            getFromAPI(`/accounts/${comment.authorId}`)
                .then(response => setAuthorLogin(response.login))
                .catch(e => distributeErrors(e))
    }, [authorLogin, comment.authorId])


    return (
        <>
            <div className={'card mb-5'}>
                <div className={'card-header'}>
                    <div className={'card-header-title'}>
                        <div>
                            <h3 className={'title is-5'}>
                                {authorLogin ?? comment.authorId}
                            </h3>
                            <h4 className={'subtitle is-7 has-text-grey'}>
                                <p className={classNames({'mb-0': showRevId})}>
                                    <FormattedMessage id="comment_created_on_at" values={{
                                        date: intl.formatDate(comment.created),
                                        time: intl.formatTime(comment.created),
                                    }} />
                                </p>
                                {showRevId &&
                                    <p>
                                        <FormattedMessage id="to_revision_id" values={{id: comment.revisionId}} />
                                    </p>
                                }
                            </h4>
                        </div>
                    </div>

                    <div className={'buttons card-header-icon'}>
                        {onEdit &&
                            <button className={'button is-link is-outlined is-small'}
                                    onClick={() => setEditDialogIsActive(true)}>
                                <span className={'icon is-small'}>
                                    <i className={'fa fa-pen'} aria-hidden="true" />
                                </span>
                            </button>
                        }

                        {onDelete &&
                            <button className={'button is-danger is-outlined is-small'}
                                    onClick={() => setDeleteDialogIsActive(true)}>
                                <span className={'icon is-small'}>
                                    <i className={'fa fa-trash'} aria-hidden="true" />
                                </span>
                            </button>
                        }
                    </div>
                </div>

                <div className={'card-content'}>
                    <article>
                        <section className={'content'}>
                            {comment.body.split('\n').map(par => <p key={nanoid()}>{par}</p>)}
                        </section>
                    </article>
                </div>
            </div>

            {onEdit &&
                <Modal isVisible={editDialogIsActive} setIsVisible={setEditDialogIsActive}>
                    <EditComment commentId={comment.id}
                                 currentBody={comment.body}
                                 setIsVisible={setEditDialogIsActive}
                                 onEdit={onEdit} />
                </Modal>
            }

            {onDelete &&
                <Modal isVisible={deleteDialogIsActive} setIsVisible={setDeleteDialogIsActive}>
                    <DeleteComment commentId={comment.id} setIsVisible={setDeleteDialogIsActive} onDelete={onDelete} />
                </Modal>
            }
        </>
    )
}


export default Comment
