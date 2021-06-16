const calculateUserLevel = (secrets, rankOne) => {
    if(rankOne) return 6;
    if (secrets < 2) return 1;
    if (2 <= secrets && secrets < 5) return 2;
    if (5 <= secrets && secrets < 10) return 3;
    if (10 <= secrets && secrets < 20) return 4;
    if (20 <= secrets) return 5;
}

export default calculateUserLevel