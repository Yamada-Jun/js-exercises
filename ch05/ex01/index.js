function ch05_ex01() {
    {
        const a = 0;

        {
            const a = 1;
            console.log(a); //=>1
        }

        console.log(a);     //=>0
    }
}

ch05_ex01();
