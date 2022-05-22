import HorizontalInputField from '../forms/atoms/HorizontalInputField'
import {FormattedMessage} from 'react-intl'


const Pagination = ({
                        previousOnClick,
                        previousDisabled,
                        nextOnClick,
                        nextDisabled,
                        count,
                        setCount,
                        countErrors,
                        showOnClick,
                        children
                    }) => {
    return (
        <nav className={'pagination'}
             role={'navigation'}
             aria-label={'pagination'}>
            <div>
                <button className={'pagination-previous'} onClick={previousOnClick} disabled={previousDisabled}>
                    <i className={'fas fa-arrow-left'} />
                </button>
                <button className={'pagination-next'} onClick={nextOnClick} disabled={nextDisabled}>
                    <i className={'fas fa-arrow-right'} />
                </button>
            </div>

            <HorizontalInputField id={'on_page'}
                                  type={'number'}
                                  inputMode={'numeric'}
                                  min={1}
                                  value={count}
                                  onChange={event => setCount(Number(event.target.value))}
                                  errorIds={countErrors} />

            {children}

            <button className={'button is-primary'} onClick={showOnClick}>
                <FormattedMessage id="show" />
            </button>
        </nav>
    )
}


export default Pagination
