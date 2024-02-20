export interface SchoolList {
    modiim: GradeList
    ofraHaza: GradeList
    kfir: GradeList
    habaalShemTov: GradeList
    haGalil: GradeList
}

export type Grade = Array<string>

export interface GradeList {
    title: string
    fourth: Grade,
    fifth: Grade,
    sixth: Grade
}

const ALL_NAMES: SchoolList = {
    modiim: {
        title: 'מודיעים \/ יהלם',
        fourth: ['ניתאי ציוני',  'איראל  גבע', 'אמונה אלטמן', 'עופרי מור', 'מירי קלפץ', 'איתי לניאדו', 'בר ברוך כהן'],
        fifth: ['אבישג לוי', 'טוהר אסתר לוי', 'נהוראי ציוני'],
        sixth: ['אדל  בן זקן', 'רפאל ברכה', 'תאיר ברוך'],
    },
    ofraHaza: {
        title: 'עפרה חזה',
        fourth: ['a', 'b','c'],
        fifth: [],
        sixth: [],
    },
    kfir: {
        title: 'כפיר',
        fourth: ['a', 'b','c'],
        fifth: [],
        sixth: [],
    },
    habaalShemTov: {
        title: 'הבעל שם טוב',
        fourth: ['a', 'b','c'],
        fifth: [],
        sixth: [],
    },
    haGalil: {
        title: 'הגליל',
        fourth: ['a', 'b','c'],
        fifth: [],
        sixth: [],
    },
}

export default ALL_NAMES