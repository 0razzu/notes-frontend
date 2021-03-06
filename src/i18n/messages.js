import LOCALES from './locales'


const nbsp = '\xa0'


const MESSAGES = {
    [LOCALES.ENGLISH]: {
        app_name: 'Notes',
        app_description: `You can publish your${nbsp}notes here.`,
        no_such_page: 'No such page!',
        language: 'Language',

        greeting: 'Hello!',
        register_or_login: `But${nbsp}first, {register} or${nbsp}{login}.`,
        register_or_login_register: 'register',
        register_or_login_login: `log${nbsp}in`,

        feed: 'Last week notes',
        note_created_on_at: `Created on${nbsp}{date} at${nbsp}{time}${nbsp}UTC`,
        to_authors_page: `To${nbsp}author’s page`,
        to_section: `To${nbsp}section`,

        users: 'Users',
        on_page: `Elements on${nbsp}the${nbsp}page`,
        show: 'Show',
        online: 'Online',
        offline: 'Offline',
        deleted: 'Deleted',
        registered_on: `Registered on${nbsp}{date}`,
        rating: 'Rating',
        all_users: 'All users',
        high_rating_users: 'High rating',
        low_rating_users: 'Low rating',
        following: 'Those who I follow',
        followers: 'Followers',
        ignored: 'Ignored',
        ignored_by: 'Those who ignore me',
        deleted_users: 'Deleted',
        superusers: 'Superusers',

        sections: 'Sections',
        create: 'Create',
        name: 'Name',

        creator: 'Creator',
        delete: 'Delete',
        delete_section_confirmation: `Delete this${nbsp}section?`,
        delete_section_confirmation_descr: `Its${nbsp}notes will${nbsp}also be${nbsp}deleted.`,

        create_note: `Create a${nbsp}note`,
        subject: 'Subject',
        section: 'Section',
        body: 'Body',

        search: 'Search',
        any_section: `Any${nbsp}section`,
        tags: 'Keywords',
        all_tags: 'All included',
        any_author: `Any${nbsp}author`,
        any_author_group: `Any${nbsp}author group`,
        not_ignored: 'Not ignored',

        revision_id: `Revision${nbsp}id`,
        author: 'Author',
        your_mark_for_note: `Your${nbsp}mark for${nbsp}this note`,
        view_revisions: 'View revisions',
        change_mark: 'Change mark',
        rate: 'Rate',
        comments: 'Comments',
        current_rev_comments: `To${nbsp}the${nbsp}current revision`,
        add: 'Add',
        comment_created_on_at: `Created on${nbsp}{date} at${nbsp}{time}${nbsp}UTC`,
        old_comments: `To${nbsp}previous revisions`,
        to_revision_id: `To${nbsp}revision${nbsp}{id}`,
        delete_comment_confirmation: `Delete this${nbsp}comment?`,
        revisions: 'Revisions',
        revision: 'Revision',
        mark: 'Mark',
        delete_note_confirmation: `Delete this${nbsp}note?`,
        delete_current_rev_comments_confirmation: `Delete comments to${nbsp}the${nbsp}current revision of${nbsp}this${nbsp}note?`,

        note_editing: 'Note editing',

        register: 'Register',
        log_in: `Log${nbsp}in`,

        registration: 'Registration',
        first_name: 'First name',
        patronymic: 'Patronymic name',
        last_name: 'Last name',
        login: 'Login',
        password: 'Password',

        authentication: `Log${nbsp}in`,

        my_account: 'My account',
        id: 'Identifier',
        followed_by_me: `Followed by${nbsp}me`,
        ignored_by_me: `Ignored by${nbsp}me`,
        superuser: 'Superuser',
        edit: 'Edit',
        delete_account: 'Delete account',

        edit_account: 'Edit account',
        old_password: 'Current password',
        new_password: 'New password',
        save: 'Save',

        make_super: 'Make superuser',
        subscribe: 'Subscribe',
        unsubscribe: 'Unsubscribe',
        ignore: 'Ignore',
        unignore: 'Remove from ignore list',
        make_them_super: `Make {login} a${nbsp}superuser?`,
        yes: 'Yes',

        my_notes: `My${nbsp}notes`,
        users_notes: '{user}’s notes',

        uh_oh: 'Uh-oh!',
        COMMENT_NOT_FOUND: `Cannot find a${nbsp}comment with${nbsp}this id`,
        DATABASE_ERROR: `An${nbsp}unknown database error has${nbsp}occurred`,
        EDIT_NOTE_CONSTRAINT_VIOLATION: `Edit note request with${nbsp}empty body`,
        ENDPOINT_NOT_FOUND: `Cannot find the${nbsp}requested endpoint`,
        LOGIN_EXISTS: `A${nbsp}user with${nbsp}this login already exists`,
        METHOD_NOT_SUPPORTED: `The${nbsp}called method is${nbsp}not${nbsp}supported by${nbsp}this endpoint`,
        NO_COOKIE: `Log${nbsp}in first`,
        NOT_PERMITTED: `This operation is${nbsp}not${nbsp}permitted for${nbsp}your account`,
        NOTE_NOT_FOUND: `Cannot find a${nbsp}note with${nbsp}this id`,
        NOTE_NOT_FOUND_NOTE_ID: `Cannot find a${nbsp}note with${nbsp}this id`,
        UNKNOWN_ERROR: `An${nbsp}unknown error has${nbsp}occurred`,
        USER_DELETED: `This user has${nbsp}left the${nbsp}server`,
        USER_NOT_FOUND_BY_ID: `Cannot find a${nbsp}user with${nbsp}this id`,
        USER_NOT_FOUND_BY_LOGIN: `Cannot find a${nbsp}user with${nbsp}this login`,
        SECTION_EXISTS: `A${nbsp}section with${nbsp}this name already exists`,
        SECTION_NOT_FOUND: `Cannot find a${nbsp}section with${nbsp}this id`,
        SECTION_NOT_FOUND_SECTION_ID: `Cannot find a${nbsp}section with${nbsp}this id`,
        SESSION_NOT_FOUND: `Log${nbsp}in first`,
        WRONG_OLD_PASSWORD: 'Wrong password',
        WRONG_PASSWORD: 'Wrong password',
        INCLUDE_CONSTRAINT_VIOLATION: `An${nbsp}incorrect note inclusion type`,
        MAX_CONSTRAINT_VIOLATION: `The${nbsp}value is too large`,
        MIN_CONSTRAINT_VIOLATION: `The${nbsp}value is too small`,
        NAME_CONSTRAINT_VIOLATION: `The${nbsp}name is${nbsp}not${nbsp}valid`,
        NAME_LENGTH_CONSTRAINT_VIOLATION: `The${nbsp}name is too long or empty`,
        NOT_BLANK: `The${nbsp}field is blank`,
        PASSWORD_CONSTRAINT_VIOLATION: `The${nbsp}password is too short`,
        SECTION_NAME_CONSTRAINT_VIOLATION: `The${nbsp}section name is${nbsp}not${nbsp}valid`,
        SORTING_CONSTRAINT_VIOLATION: `An${nbsp}incorrect sorting type`,
        TYPE_MISMATCH: `A${nbsp}wrong field type`,
        USER_LIST_TYPE_CONSTRAINT_VIOLATION: `An${nbsp}incorrect user list type`,
    },

    [LOCALES.RUSSIAN]: {
        app_name: 'Заметки',
        app_description: 'Тут можно публиковать заметки.',
        no_such_page: 'Нет такой страницы!',
        language: 'Язык',

        greeting: 'Добрый день!',
        register_or_login: `Но${nbsp}сначала {register} или${nbsp}{login}.`,
        register_or_login_register: 'зарегистрируйтесь',
        register_or_login_login: 'войдите',

        feed: `Заметки за${nbsp}последнюю неделю`,
        note_created_on_at: `Создана {date} в${nbsp}{time}${nbsp}UTC`,
        to_authors_page: `К${nbsp}странице автора`,
        to_section: `К${nbsp}разделу`,

        users: 'Пользователи',
        on_page: `Элементов на${nbsp}странице`,
        show: 'Показать',
        online: 'Онлайн',
        offline: 'Офлайн',
        deleted: 'Покинул(-а) сервер',
        registered_on: 'Зарегистрирован(-а) {date}',
        rating: 'Рейтинг',
        all_users: 'Все пользователи',
        high_rating_users: `С${nbsp}высоким рейтингом`,
        low_rating_users: `С${nbsp}низким рейтингом`,
        following: `На${nbsp}кого я подписан(-а)`,
        followers: 'Подписчики',
        ignored: 'Игнорируемые',
        ignored_by: 'Игнорирующие меня',
        deleted_users: 'Покинувшие сервер',
        superusers: 'Суперпользователи',

        sections: 'Разделы',
        create: 'Создать',
        name: 'Название',

        creator: 'Создатель',
        delete: 'Удалить',
        delete_section_confirmation: `Удалить этот${nbsp}раздел?`,
        delete_section_confirmation_descr: `Также будут${nbsp}удалены его${nbsp}заметки.`,

        create_note: 'Создать заметку',
        subject: 'Тема',
        section: 'Раздел',
        body: 'Текст',

        search: 'Поиск',
        any_section: 'Любой раздел',
        tags: 'Ключевые слова',
        all_tags: 'Все входят',
        any_author: 'Любой автор',
        any_author_group: `Автор из${nbsp}любой группы`,
        not_ignored: 'Неигнорируемые',

        revision_id: `Идентификатор${nbsp}версии`,
        author: 'Автор',
        your_mark_for_note: `Ваша${nbsp}оценка этой заметки`,
        view_revisions: 'Посмотреть версии',
        change_mark: 'Изменить оценку',
        rate: 'Оценить',
        comments: 'Комментарии',
        current_rev_comments: `К${nbsp}текущей версии`,
        add: 'Добавить',
        comment_created_on_at: `Создан {date} в${nbsp}{time}${nbsp}UTC`,
        old_comments: `К${nbsp}предыдущим версиям`,
        to_revision_id: `К${nbsp}версии${nbsp}{id}`,
        delete_comment_confirmation: `Удалить этот${nbsp}комментарий?`,
        revisions: 'Версии',
        revision: 'Версия',
        mark: 'Оценка',
        delete_note_confirmation: `Удалить эту${nbsp}заметку?`,
        delete_current_rev_comments_confirmation: `Удалить комментарии к${nbsp}текущей версии этой${nbsp}заметки?`,

        note_editing: 'Редактирование заметки',

        register: 'Зарегистрироваться',
        log_in: 'Войти',

        registration: 'Регистрация',
        first_name: 'Имя',
        patronymic: 'Отчество',
        last_name: 'Фамилия',
        login: 'Логин',
        password: 'Пароль',

        authentication: 'Вход',

        my_account: 'Мой аккаунт',
        id: 'Идентификатор',
        followed_by_me: `В${nbsp}подписках`,
        ignored_by_me: `В${nbsp}игнор-листе`,
        superuser: 'Суперпользователь',
        edit: 'Редактировать',
        delete_account: 'Удалить аккаунт',

        edit_account: 'Редактировать аккаунт',
        old_password: 'Текущий пароль',
        new_password: 'Новый пароль',
        save: 'Сохранить',

        make_super: 'Сделать суперпользователем',
        subscribe: 'Подписаться',
        unsubscribe: 'Отписаться',
        ignore: 'Игнорировать',
        unignore: `Убрать из${nbsp}игнор-листа`,
        make_them_super: 'Сделать {login} суперпользователем?',
        yes: 'Да',

        my_notes: `Мои${nbsp}заметки`,
        users_notes: 'Заметки автора {user}',

        uh_oh: 'Ой!',
        COMMENT_NOT_FOUND: 'Нет такого комментария',
        DATABASE_ERROR: 'Ошибка базы данных',
        EDIT_NOTE_CONSTRAINT_VIOLATION: `Пустой запрос на${nbsp}редактирование заметки`,
        ENDPOINT_NOT_FOUND: 'Нет такого эндпойнта',
        LOGIN_EXISTS: `Пользователь с${nbsp}таким логином уже существует`,
        METHOD_NOT_SUPPORTED: `Эндпойнт не${nbsp}поддерживает этот${nbsp}метод`,
        NO_COOKIE: `Сначала войдите в${nbsp}аккаунт`,
        NOT_PERMITTED: `Вы не${nbsp}авторизованы для${nbsp}выполнения этого${nbsp}действия`,
        NOTE_NOT_FOUND: 'Нет такой заметки',
        NOTE_NOT_FOUND_NOTE_ID: 'Нет такой заметки',
        UNKNOWN_ERROR: 'Произошла неизвестная ошибка',
        USER_DELETED: 'Пользователь покинул сервер',
        USER_NOT_FOUND_BY_ID: 'Нет такого пользователя',
        USER_NOT_FOUND_BY_LOGIN: `Нет пользователя с${nbsp}таким логином`,
        SECTION_EXISTS: `Уже есть раздел с${nbsp}таким названием`,
        SECTION_NOT_FOUND: `Раздел не${nbsp}найден`,
        SECTION_NOT_FOUND_SECTION_ID: `Раздел не${nbsp}найден`,
        SESSION_NOT_FOUND: `Сначала войдите в${nbsp}аккаунт`,
        WRONG_OLD_PASSWORD: 'Неверный пароль',
        WRONG_PASSWORD: 'Неверный пароль',
        INCLUDE_CONSTRAINT_VIOLATION: 'Некорректный тип заметок',
        MAX_CONSTRAINT_VIOLATION: 'Слишком большое значение',
        MIN_CONSTRAINT_VIOLATION: 'Слишком малое значение',
        NAME_CONSTRAINT_VIOLATION: 'Некорректное имя',
        NAME_LENGTH_CONSTRAINT_VIOLATION: `Слишком длинное или${nbsp}слишком короткое имя`,
        NOT_BLANK: 'Поле должно быть заполнено',
        PASSWORD_CONSTRAINT_VIOLATION: 'Слишком короткий пароль',
        SECTION_NAME_CONSTRAINT_VIOLATION: 'Некорректное название раздела',
        SORTING_CONSTRAINT_VIOLATION: 'Некорректный способ сортировки',
        TYPE_MISMATCH: 'Некорректный тип поля',
        USER_LIST_TYPE_CONSTRAINT_VIOLATION: 'Некорректный тип пользовательского списка',
    },
}


export default MESSAGES
