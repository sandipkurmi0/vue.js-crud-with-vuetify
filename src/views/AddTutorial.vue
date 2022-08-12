<template>
    <div class="submit-form mt-3 mx-auto">
        <p class="headline">Add Tutorial</p>
        <div>
            <v-form ref="form" lazy-validation>
                <v-text-field v-model="tutorial.title" :rules="[(v) => !!v || 'Title is required']" label="Title"
                    required></v-text-field>
                <v-text-field v-model="tutorial.description" :rules="[(v) => !!v || 'Description is required']"
                    label="Description" required></v-text-field>
            </v-form>
            <v-btn color="primary" class="mt-3" @click="saveTutorial" :disabled="loading">
                <div v-if="loading" class="spinner-border spinner-border-sm"></div>
                <span v-if="loading" class="px1">saving</span>
                <span v-else>Submit</span>
            </v-btn>
        </div>
    </div>
</template>

<script>
import TutorialDataService from '@/services/TutorialDataService';
import Swal from 'sweetalert2'
export default {
    name: 'add-tutorial',

    data() {
        return {
            tutorial: {
                id: null,
                title: "",
                description: "",
                published: false,
            },
            loading: false,
        };
    },

    methods: {
        saveTutorial() {
            this.loading = !false

            console.log(this.tutorial.title);
            console.log(this.tutorial.description);

            if (this.tutorial.title && this.tutorial.description) {
                console.log(true)
                var data = {
                    title: this.tutorial.title,
                    description: this.tutorial.description,
                };

                TutorialDataService.create(data)
                    .then((response) => {
                        Swal.fire({
                            position: 'bottom-center',
                            icon: 'success',
                            title: 'Your Tutorial has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.tutorial.id = response.data.data._id
                        this.loading = !true
                        this.$router.push({ name: "tutorials" });
                    }).catch((error) => {
                        console.log(error);
                    })

            } else {

                if (!this.tutorial.title) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'please Enter Title field',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                } else if (!this.tutorial.description) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'please Enter Description field',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                }

                this.loading = !true
            }





        },
        newTutorial() {
            this.tutorial = {}
        }
    }
}

</script>

<style>
.submit-form {
    max-width: 300px;
}
</style>
