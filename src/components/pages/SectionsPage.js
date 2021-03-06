import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from '@reduxjs/toolkit'
import {setPageId} from '../../store/slices/pageSlice'
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {getFromAPI} from '../../utils/fetchFromAPI'
import distributeErrors from '../../utils/distributeErrors'
import CreateSection from '../forms/CreateSection'
import Modal from '../atoms/Modal'


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

            <Modal isVisible={createSectionIsActive} setIsVisible={setCreateSectionIsActive}>
                <CreateSection sections={sections}
                               setSections={setSections}
                               setVisible={setCreateSectionIsActive} />
            </Modal>
        </>
    )
}


const mapDispatchToProps = dispatch => ({
    setPageId: bindActionCreators(setPageId, dispatch),
})


export default connect(null, mapDispatchToProps)(SectionsPage)
