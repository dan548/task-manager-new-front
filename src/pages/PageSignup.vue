<template>
  <div>
    <form class="sign-form" v-on:submit.prevent="$_submit_">
      <div class="login-form__field-wrapper">
        <div class="login-form__field-with-label">
          <label for="user"
                 class="login-form__field-label"
                 :class="{ 'login-form__field-label_empty': (user === '') }"
          >
            {{ $t('sign-in/up.e-mail') }}
          </label>
          <FormField id="user"
                     v-model="user">
          </FormField>
        </div>
        <div class="login-form__field-with-label">
          <label for="password"
                 class="login-form__field-label"
                 :class="{ 'login-form__field-label_empty': (password === '') }"
          >
            {{ $t('sign-in/up.password') }}
          </label>
          <FormField id="password"
                     v-model="password"
                     type="password"
          >
          </FormField>
        </div>
      </div>
      <div class="checkbox"
           :class="{'checkbox_checked' : this.checked, 'checkbox_active': !this.anyFieldEmpty}"
           v-on:click="$_check_"
      >
        <label
            v-on:click="$_check_"
            class="agreement-checkbox"
            :class="{'agreement-checkbox_checked' : this.checked, 'agreement-checkbox_active': !this.anyFieldEmpty}"
        >
          {{ $t('agreement-text') }}
        </label>
      </div>
      <CreateButton
          class-name="login-form__button"
          :value="$t('submit-button')"
          :disabled="disable"
          type="submit"
      >
      </CreateButton>
    </form>
    <div class="link-wrapper">
      <span :class="$style['sign-in-link__hint']">{{ $t('redirect-hint') }}</span>
      <router-link to="login" class="another-page sign-in-link">{{ $t('redirect') }}</router-link>
    </div>
  </div>
</template>

<script>
    import FormField from "../components/FormField";
    import CreateButton from "../components/buttons/CreateButton";
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        name: "PageSignup",
        components: {FormField, CreateButton},
        data() {
            return {
                user: '',
                password: '',
                checked: false,
                locale: 'en'
            }
        },
        methods: {
            $_submit_() {
                this.signUp({ username: this.user, password: this.password});
            },
            $_check_() {
              this.checked = !this.checked;
            },
            ...mapActions('user', {
                signUp: 'signUp'
            }),
            ...mapMutations('user', {
                flushError: 'FLUSH_ERROR'
            })
        },
        computed: {
            isUser: function() {
                return this.user;
            },
            isPassword: function() {
                return this.password;
            },
            anyFieldEmpty: function () {
              return this.user === '' || this.password === '';
            },
            disable: function() {
              return this.anyFieldEmpty || !this.checked;
            },
            ...mapState('user', {
                authorized: state => state.authorized,
                error: state => state.error,
                processing: state => state.processing
            })
        },
        watch: {
            '$route': 'flushError'
        },
        created: function() {
            if (this.authorized) {
                this.$router.replace('/');
            }
        },
        updated: function() {
            if (this.authorized) {
                this.$router.replace('/');
            }
            if (this.user === '' || this.password === '') {
                this.flushError();
            }
        }
    }
</script>

<style module lang="scss">
  .sign-in-link__hint {
    position: absolute;
    transform: translateY(-50%) translateX(-50%);
    color: #878787;
    font-weight: 400;
  }
</style>

<i18n>
  {
    "en": {
      "submit-button": "Sign up",
      "redirect": "Log in",
      "redirect-hint": "Already have an account?",
      "agreement-text": "I agree to processing of personal data"
    },
    "ru": {
      "submit-button": "Зарегистрироваться",
      "redirect": "Войти",
      "redirect-hint": "Уже есть аккаунт?",
      "agreement-text": "Я даю согласие на обработку персональных данных"
    }
  }
</i18n>