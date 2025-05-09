import { ref } from "vue";

export default function useForm() { 
    // 定义表单数据
    const loginForm = ref({
        username: '',  
        password: ''
    });
    
    // const loginForm = new FormData();
    // loginForm.append('username', '');
    // loginForm.append('password', '');

    // 定义校验规则
    const rules = ref({
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
    });

    return { loginForm, rules };
}