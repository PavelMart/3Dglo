const changePhoto = () => {
    const commandPhotos = document.querySelectorAll('.command__photo');

    commandPhotos.forEach( item => {
        const src = item.src;
        const datasetImg = item.dataset.img;

        item.addEventListener('mouseover', () => {
            item.src = datasetImg;
        });
        item.addEventListener('mouseout', () => {
            item.src = src;
        });
    });
};

export default changePhoto;