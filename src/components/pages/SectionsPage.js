import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {getFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import classNames from 'classnames'
import CreateSection from '../forms/CreateSection'


const SectionsPage = ({setPageId}) => {
    const [sections, setSections] = useState([])
    const [createSectionIsActive, setCreateSectionIsActive] = useState(false)


    useEffect(() => {
        setPageId('sections')
    }, [setPageId])


    useEffect(() => {
        getFromAPI('/sections')
            .then(response => setSections(response))
            .catch(e => distributeErrors(e))
    }, [])


    return (
        <>
            <h2><FormattedMessage id="sections" /></h2>
            <article>
                <nav className={'level'}>
                    <div className={'level-left'}>
                        <div className={'level-item'}>
                            <button className={'button is-success'}
                                    onClick={() => setCreateSectionIsActive(true)}>
                                <FormattedMessage id={'create'} /></button>
                        </div>
                    </div>
                </nav>

                <section>
                    <div className={'menu is-striped'}>
                        <ul className={'menu-list'}>
                            {sections.map(section =>
                                <li key={section.id}><Link to={`/sections/${section.id}`}>{section.name}</Link></li>
                            )}
                        </ul>
                    </div>
                </section>
            </article>

            <div className={classNames('modal', {'is-active': createSectionIsActive})}>
                <div className={'modal-background'} />
                <div className={'modal-content'}>
                    <CreateSection sections={sections}
                                   setSections={setSections}
                                   setVisible={setCreateSectionIsActive} />
                </div>
                <button className={'modal-close is-large'}
                        aria-label="close"
                        onClick={() => setCreateSectionIsActive(false)} />
            </div>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(SectionsPage)
