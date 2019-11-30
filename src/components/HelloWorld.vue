<template>
  <div class="container h-100">
    <div class="row align-items-center h-100">
      <div class="col-sm-12 col-md-8 mx-auto">
        <div class="content p-4 bg-dark b-0">
          <div class="mb-4">
            <img width="200" src="../assets/img/espartas2.png" class />
            <h3 class="mt-2">
              <img width="140" src="../assets/img/sublogo.png" />
              <img width="140" src="../assets/img/free-fire.png" />
            </h3>
            <img height="30" src="../assets/img/maranhao.png" />
          </div>

          <h3>Reserve sua vaga!!!</h3>
          <h4>1º CAMPEONATO eSpartas DE FREE FIRE DO MARANHÃO</h4>

          <p>Gratuito para os primeiros 500 jogadores</p>

          <div class="col-md-12">
            <form @submit.prevent="signUp" class="row">

              <div class="col-12 col-sm">
                <input type="email" v-model="email" placeholder="Informe seu e-mail" class="form-control" />
              </div>

              <div class="col-12 col-sm-auto pl-sm-0">
                <input type="submit" name="commit" value="Garantir a vaga" class="btn btn-primary btn-block" />
              </div>
            </form>

            <div v-if="countdown" class="mt-2">
              <h5>Faltam</h5>
              <h5 class="timer">{{ countdown }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  color: #dadae0 !important;
  font-weight: 100;
}

.content {
  background-image: url(http://themes.pixiesquad.com/pixiefreak/twisting-nether/wp-content/uploads/2018/10/background-copy.jpg);
}
</style>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      email: "",
      countdown: 0
    };
  },

  beforeMount() {
    window.setInterval(() => {
      this.countdown = this.getCountdown("01/01/2020 05:00:00 PM");
    }, 1000);
  },

  methods: {
    signUp: function() {
      const random_password =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15);

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, random_password)
        .then(
          () => {
            var user = firebase.auth().currentUser;

            user.sendEmailVerification().then(
              () => {
                alert(`Enviamos um email de confirmação para ${this.email}`);
              },
              err => {
                alert("Oops. " + err.message);
              }
            );
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
    getCountdown: function(endDate) {
      let days, hours, minutes, seconds;

      endDate = new Date(endDate).getTime();

      if (isNaN(endDate)) {
        return false;
      }

      let startDate = new Date().getTime();

      let timeRemaining = parseInt((endDate - startDate) / 1000);

      if (timeRemaining < 0) {
        return false;
      }

      days = parseInt(timeRemaining / 86400);
      timeRemaining = timeRemaining % 86400;

      hours = parseInt(timeRemaining / 3600);
      timeRemaining = timeRemaining % 3600;

      minutes = parseInt(timeRemaining / 60);
      timeRemaining = timeRemaining % 60;

      seconds = parseInt(timeRemaining);
      days = parseInt(days, 10);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return `${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos`;
    }
  }
};
</script>