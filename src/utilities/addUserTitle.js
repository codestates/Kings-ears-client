const addUserTitle = (userlv) => {
    switch (userlv) {
      case 1:
        return 'Lv.1 소식이 늦은 소작농';
      case 2:
        return 'Lv.2 떠벌이 상인';
      case 3:
        return 'Lv.3 소문이 궁금한 기사';
      case 4:
        return 'Lv.4 가십에 민감한 귀족';
      case 5:
        return 'Lv.5 비밀을 아는 성직자';
      case 6: 
        return 'Lv.99 킹 동 키';
      default: 
        return '???';
    }
};

export default addUserTitle;
