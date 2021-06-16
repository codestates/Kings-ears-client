const calculateUserLevel = (secrets) => {
    if (secrets < 2) return 1;
    if (2 <= secrets && secrets < 5) return 2;
    if (5 <= secrets && secrets < 10) return 3;
    if (10 <= secrets && secrets < 20) return 4;
    if (20 < secrets && secret < 9998) return 5;
    if (secrets > 9998) return 6;
}

export default calculateUserLevel