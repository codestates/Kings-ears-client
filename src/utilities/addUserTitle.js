const addUserTitle = (userlv) => {
    switch (userlv) {
      case 1:
        return '입이 가벼운 소작농';
      case 2:
        return '떠벌이 상인';
      case 3:
        return '숨기는게 없는 귀족';
      case 4:
        return '엔들리스 고해성사 중인 성직자';
      case 5:
        return '킹동키';
      default:
        return '???';
    }
};

export default addUserTitle;
