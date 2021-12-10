let phones = [
    { Brand: 'Apple', Model: 'Iphone 13' },
    { Brand: 'Xiaomi', Model: 'Redmi Note 9' },
    { Brand: 'Huawei', Model: 'P40 Pro' }
];

const showPhones = async () => {
    try {
        await addPhone({ Brand: 'Samsung', Model: 'Galaxy S20' });
        console.clear();
        console.log("-------------------------");
        phones.map(phone => {
            console.log(phone.Brand, phone.Model);
            // console.log(phone.Model);
            console.log("-------------------------")
        });
    } catch (error) {
        console.error(error)
    }

}

const addPhone = (newPhone) => {
    const promise = new Promise((res, rej) => {
        phones.push(newPhone);
        res(phones)
        // rej('An error occurred!');
    })
    return promise;
}

showPhones();