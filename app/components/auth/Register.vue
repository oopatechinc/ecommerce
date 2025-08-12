<template>
  <v-card :loading="isRegistering">
    <v-card-title class="py-4 primary white--text">
      <v-img :src="require('@/assets/logo.svg')" width="30"></v-img>

      <v-spacer></v-spacer>
      <v-btn icon dark @click="cancel">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <div class="px-6"><p class="mt-6 primary--text">Register</p></div>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="firstname"
            label="Firstname" dense outlined
            :error-messages="firstnameErrors"
            @input="$v.firstname.$touch()"
            @blur="$v.firstname.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="lastname"
            label="Lastname" dense outlined
            :error-messages="lastnameErrors"
            @input="$v.lastname.$touch()"
            @blur="$v.lastname.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="email"
            label="Email"
            dense
            outlined
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0">
          <v-text-field v-model="phone_number" label="Phone" dense outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="password"
            label="Password" dense outlined
            type="password"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password" dense outlined
            type="password"
            :error-messages="confirmPasswordErrors"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn color="primary" :loading="isRegistering" block class="mt-4" @click="register">Sign Up</v-btn>
      <p class="py-2">
        By signing up on Bookisia, you agree to our <NuxtLink to="/terms-and-conditions">Terms and Conditions</NuxtLink>
        and our <NuxtLink to="privacy-policy"> Privacy Policy</NuxtLink>.</p>

    </v-card-text>
    <v-card-actions class="elevation-2">
      <v-spacer></v-spacer>
      <span class="member-text pr-0">Already a member?</span>
      <v-btn text color="primary" class="text-capitalize pl-0"  @click="showLoginDialog">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    import {required, email, sameAs} from 'vuelidate/lib/validators'
    import {mapGetters, mapMutations} from "vuex"

    export default {
        name: 'RegisterComponent',
        validations: {
            firstname: {required},
            lastname: {required},
            email: {required, email},
            password: {required},
            confirmPassword: {required, sameAsPassword: sameAs('password')},
        },
        data() {
            return {
                firstname: '',
                lastname: '',
                email: '',
                phone_number: '',
                password: '',
                confirmPassword: '',
                isRegistering: false
            }
        },
        computed: {
          ...mapGetters('business', {business: 'business'}),
            firstnameErrors() {
                const errors = []
                if (!this.$v.firstname.$dirty) return errors
                !this.$v.firstname.required && errors.push('Firstname is required')
                return errors
            },
            lastnameErrors() {
                const errors = []
                if (!this.$v.lastname.$dirty) return errors
                !this.$v.lastname.required && errors.push('Lastname is required')
                return errors
            },
            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push('A valid email is required')
                !this.$v.email.required && errors.push('Email is required')
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Password is required')
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
            cancel() {
                this.$v.$reset();
                this.firstname = '';
                this.lastname = '';
                this.email = '';
                this.phone_number = '';
                this.$store.commit('app/setState', {key: 'showRegistrationDialog', value: false})
            },
            async register() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Missing mandatory fields for registration form. Please enter value for field(s) highlighted in red',
                        color: 'red'
                    });

                    return false;
                }

                const data = {
                    // business_id: this.business.id,
                    business_id: 1,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    phone: this.phone_number
                };

                let error = false
                this.isRegistering = true
                await this.$store.dispatch('user/register', data).catch(() => {
                  error = true
                })
                this.isRegistering = false

              if (error) return

              this.$store.commit('snackbar/setSnackbar', {
                show: true,
                message: 'Your registration was successful! You are now logged in',
                color: 'green'
              });

                this.cancel()
            },
            showLoginDialog() {
            this.cancel()
              this.setState({key: 'showLoginDialog', value: true})
            }
        }
    }
</script>
