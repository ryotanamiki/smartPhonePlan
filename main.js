new Vue({
  el: '#app',
  data: {
    questionIndex: 0,
    selectedOptions: [],
    questions: [
      {
        text: '電話番号（090等）は必要ですか？',
        options: ['必要', '不要']
      },
      {
        text: 'ご利用になるSIMの形状を教えてください',
        options: ['SIMカード', 'eSIM※'],
        note: '※eSIMご利用にはeSIM対応機種が必要です。\n未対応の場合はご利用できませんので、「SIMカード」を選択してください。'
      },
      {
        text: 'SMSを使いますか？',
        options: ['SMSを使う', 'SMSは使わない']
      }
    }
  },
  methods: {
    selectOption(index) {
      this.selectedOptions[this.questionIndex] = index;
      if (this.questionIndex === 0) {
        // Move to the next question based on the selected option
        this.questionIndex = index === 0 ? 1 : 2;
      } else {
        // Handle the result or any other logic you need to perform
        // In this example, we'll just log the selected options
        console.log('Selected options:', this.selectedOptions);
      }
    }
  }
});
