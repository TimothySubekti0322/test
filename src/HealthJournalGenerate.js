import { getArchive, addArchive } from './Archive.js';

const saveButton = document.querySelector('#saveArchive');

saveButton.addEventListener('click', function () {
    "Masukkan kode di sini!";
    const id = '#03';
    const date = '19 September 2023';
    addArchive(id, date);
    console.log(getArchive());
});