<template>
  <v-card :loading="isLoading" rounded>
    <v-card-title class="py-4 primary white--text">
      <v-img :src="require('@/assets/logo.svg')" width="30"></v-img>

      <v-spacer></v-spacer>
      <v-btn icon dark @click="clear">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-title class="d-flex justify-space-between py-5">
      {{title}}
    </v-card-title>
    <v-card-subtitle>
      <small>{{subtitle}}</small>
    </v-card-subtitle>
    <v-card-text>
      <v-text-field
          v-if="stage === 'email'"
          v-model="email"
          outlined
          dense
          type="email"
          label="Email"
          :error-messages="emailErrors"
          @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
          v-if="stage === 'verify'"
          v-model="verificationCode"
          outlined
          dense
          type="text"
          label="Verification Code"
          :error-messages="verificationCodeErrors"
          @blur="$v.verificationCode.$touch()"
      ></v-text-field>

      <div v-if="stage === 'password'">
        <v-text-field
            v-model="password"
            outlined
            dense
            type="password"
            label="Password"
            :error-messages="passportErrors"
            @blur="$v.password.$touch()"
        ></v-text-field>

        <v-text-field
            v-model="confirmPassword"
            outlined
            dense
            type="password"
            label="Confirm Password"
            :error-messages="confirmPasswordErrors"
            @blur="$v.confirmPassword.$touch()"
        ></v-text-field>
      </div>

    </v-card-text>
    <v-card-actions>
      <v-btn v-if="stage === 'email'" block color="primary" :loading="isLoading" @click="sendVerificationCode" >Submit</v-btn>
      <v-btn v-if="stage === 'verify'" block color="primary" :loading="isLoading" @click="verifyCode" >Verify</v-btn>
      <v-btn v-if="stage === 'password'" block color="primary" :loading="isLoading" @click="updatePassword">Update Password</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import { mapMutations } from 'vuex'
import {email, required, sameAs} from "vuelidate/lib/validators"
import UserService from "@/services/user.service";

export default {
  name: 'ForgotPassword',
  validations: {
    email: {required, email},
    verificationCode: {required},
    password: {required},
    confirmPassword: {required, sameAsPassword: sameAs('password')},
  },
  data() {
    return {
      email: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      title: 'Enter Your Email',
      subtitle: 'A code will be sent to the email you provide',
      stage: 'email'
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Your email is required')
      !this.$v.email.email && errors.push('Valid email is required')
      return errors
    },
    verificationCodeErrors () {
      const errors = []
      if (!this.$v.verificationCode.$dirty) return errors
      !this.$v.verificationCode.required && errors.push('Your verification code is required')
      return errors
    },
    passportErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Your passport is required')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required && errors.push('Password confirmation is required')
      !this.$v.confirmPassword.sameAsPassword && errors.push('Password confirmation must match password value')
      return errors
    }
  },
  methods: {
    ...mapMutations('app', {
      setState: 'setState'
    }),
     async sendVerificationCode() {
      if (this.$v.email.$invalid) {
        this.$store.commit('snackbar/setSnackbar', {
          show: true,
          message: 'Please enter your email',
          color: 'red'
        })

        return
      }

      let error = false
      this.isLoading = true
      await UserService(this.$axios).sendVerificationCode({type: 'email', payload: this.email}).catch(() => {
        error = true
      })
      this.isLoading = false
      //
      if (error) return
      //
      this.stage = 'verify'
      this.title = 'Verify the code'
      this.subtitle = 'Enter the code sent to your email'

    },
    async verifyCode() {
      if (this.$v.verificationCode.$invalid) {
        this.$store.commit('snackbar/setSnackbar', {
          show: true,
          message: 'Please enter the verification that was sent to your email',
          color: 'red'
        })

        return
      }

      let error = false
      this.isLoading = true
      await UserService(this.$axios).confirmVerificationCode({email: this.email, verification_code: this.verificationCode}).catch(() => {
        error = true
      })
      this.isLoading = false

      if (error) return

      this.stage = 'password'
      this.title = 'New Password'
      this.subtitle = 'Enter your new password'

    },
    async updatePassword() {
      if (this.$v.password.$invalid || this.$v.confirmPassword.$invalid) {
        this.$store.commit('snackbar/setSnackbar', {
          show: true,
          message: 'Please enter your new passport',
          color: 'red'
        })

        return
      }

      let error = false
      this.isLoading = true
      await UserService(this.$axios).updatePassword({email: this.email, password: this.password}).catch(() => {
        error = true
      })
      this.isLoading = false

      if (error) return

      this.$store.commit('snackbar/setSnackbar', {
        show: true,
        message: 'Your password has been successfully updated.',
        color: 'success'
      })

      this.clear()
    },
    clear() {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.title = 'Enter Your Email'
      this.subtitle = 'A code will be sent to the email you provide'
      this.stage = 'email'
      this.$v.$reset()

      this.setState({key: 'showRegistrationDialog', value: false})
      this.setState({key: 'showForgotPasswordDialog', value: false})
      this.setState({key: 'showLoginDialog', value: true})
    }
  }
}
</script>
