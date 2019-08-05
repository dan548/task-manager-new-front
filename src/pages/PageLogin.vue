<template>
  <div>
    <form class="sign-form" v-on:submit.prevent="$_submit_">
      <div class="login-form__field-wrapper">
        <div class="login-form__field-with-label">
          <label
            for="user"
            class="login-form__field-label"
            :class="{ 'login-form__field-label_empty': user === '' }"
          >
            {{ $t("sign-in/up.e-mail") }}
          </label>
          <FormField id="user" v-model="user"> </FormField>
        </div>
        <div class="login-form__field-with-label">
          <label
            for="password"
            class="login-form__field-label"
            :class="{ 'login-form__field-label_empty': password === '' }"
          >
            {{ $t("sign-in/up.password") }}
          </label>
          <FormField id="password" v-model="password" type="password">
          </FormField>
        </div>
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
      <span :class="$style['sign-up-link__hint']">{{
        $t("redirect-hint")
      }}</span>
      <router-link to="signup" class="another-page sign-up-link">{{
        $t("redirect")
      }}</router-link>
    </div>
  </div>
</template>

<script>
    import { mapActions, mapMutations, mapState } from "vuex";
    import FormField from "../components/FormField";
    import CreateButton from "../components/buttons/CreateButton";

    export default {
        name: "PageLogin",
        components: { FormField, CreateButton },
        data() {
            return {
                user: "",
                password: "",
                locale: "en"
            };
        },
        methods: {
            $_submit_() {
                this.signIn({ username: this.user, password: this.password });
            },
            ...mapActions("user", {
                signIn: "signIn"
            }),
            ...mapMutations("user", {
                flushError: "FLUSH_ERROR"
            })
        },
        computed: {
            isUser: function() {
                return this.user;
            },
            isPassword: function() {
                return this.password;
            },
            disable: function() {
                return !this.isUser || !this.isPassword;
            },
            emptyFields: function () {
                return this.user === "" || this.password === "";
            },
            ...mapState("user", [
                'authorized',
                'error',
                'processing'
            ])
        },
        watch: {
            $route: "flushError",
            authorized: function (newVal) {
                if (newVal) {
                    this.$router.replace("/");
                }
            },
            emptyFields: function (newVal) {
                if (newVal) {
                    this.flushError();
                }
            }
        }
    };
</script>

<style module lang="scss">
.sign-up-link__hint {
  position: absolute;
  transform: translateY(-50%) translateX(-50%);
  color: #878787;
  font-weight: 400;
}
</style>

<style lang="scss">
$buttonColor: #74bbfd;
$textColor: #ffffff;

.login-form__button {
  background: $buttonColor;
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12);
  height: 40px;
  border: none;
  font-size: 17px;
  color: $textColor;
  font-weight: 400;
  text-align: center;
}
.another-page {
}
.link-wrapper {
}
</style>

<i18n>
  {
    "en": {
      "submit-button": "Log in",
      "redirect": "Sign up",
      "redirect-hint": "Don't have an account?"
    },
    "ru": {
      "submit-button": "Зарегистрироваться",
      "redirect": "Войти",
      "redirect-hint": "Уже есть аккаунт?",
      "agreement-text": "Я даю согласие на обработку персональных данных"
    }
  }
</i18n>