const app = new Vue({
            el: '#app',
            data: {
                currentQuestionIndex: 0,
                showingBreakdown: false,
                selectedPlan: null,
                questions: [
                    {
                        text: '電話番号（090等）は必要ですか？',
                        answers: [
                            { id: 1, text: '使う', subText: '（お乗り換えの方はこちら）', icon: '/images/images46.png' },
                            { id: 2, text: '使わない', icon: '/images/images47.png' }
                        ]
                    },
                    {
                        text: 'SMSを使いますか？',
                        answers: [
                            { id: 1, text: '使う', icon: 'path-to-icon-1.png' },
                            { id: 2, text: '使わない', icon: 'path-to-icon-2.png' }
                        ]
                    },
                    // Add more questions and answers
                ],
                plans: [
                    { name: 'プランA', price: 1000, basePrice: 800, dataPlan: 10 },
                    { name: 'プランB', price: 1200, basePrice: 900, dataPlan: 15 },
                    // Define more plans
                ]
            },
            computed: {
                currentQuestion() {
                    return this.questions[this.currentQuestionIndex];
                }
            },
            methods: {
                selectAnswer(answer) {
                    if (this.currentQuestionIndex === this.questions.length - 1) {
                        this.selectedPlan = this.calculatePlan();
                    }
                    this.currentQuestionIndex += 1;
                },
                goBack() {
                    if (this.currentQuestionIndex > 0) {
                        this.currentQuestionIndex -= 1;
                    }
                },
                calculatePlan() {
                    // Calculate the plan based on user's answers
                    // Replace with your logic
                    return this.plans[0];
                },
                showBreakdown() {
                    this.showingBreakdown = true;
                }
            }
        });