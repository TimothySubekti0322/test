var archive = [
    {
        id: '#01',
        date: "12 September 2023"
    },
    {
        id: '#02',
        date: "15 September 2023"
    }
]

export function getArchive() {
    return archive;
}

export function addArchive(id, date) {
    archive.push({
        id: id,
        date: date
    })
}