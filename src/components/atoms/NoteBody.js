import {Link} from 'react-router-dom'
import {FormattedMessage, useIntl} from 'react-intl'
import {nanoid} from 'nanoid'


const NoteBody = ({note}) => {
    const intl = useIntl()


    return (
        <div className={'card-content'}>
            <h3 className={'title is-4'}><Link to={`/notes/${note.id}`}>{note.subject}</Link></h3>
            <h4 className={'subtitle is-6 has-text-grey'}>
                <FormattedMessage id="created_on_at" values={{
                    date: intl.formatDate(note.created),
                    time: intl.formatTime(note.created),
                }} />
            </h4>
            <article>
                <section className={'content'}>
                    {note.body.split('\n').map(par => <p key={nanoid()}>{par}</p>)}
                </section>
            </article>
        </div>
    )
}


export default NoteBody
