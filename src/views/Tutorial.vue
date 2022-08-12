<template>
    <div v-if="currentTutorial" class="edit-form mt-3 mx-auto">
        <p class="headline">Edit Tutorial</p>
        <v-form ref="form" lazy-validation>
            <v-text-field v-model="currentTutorial.title" :rules="[(v) => !!v || 'Title is required']" label="Title"
                required></v-text-field>
            <v-text-field v-model="currentTutorial.description" :rules="[(v) => !!v || 'Description is required']"
                label="Description" required></v-text-field>
            <label><strong>Status:</strong></label>
            {{ currentTutorial.published ? "Published" : "Pending" }}
            <v-divider class="my-5"></v-divider>
            <v-btn v-if="currentTutorial.published" @click="updatePublished(false)" color="primary" small class="mr-2">
                <div v-if="isLoading" class="spinner-border spinner-border-sm"></div>
                <span v-if="isLoading" class="px1">Loading</span>
                <span v-else>UnPublish</span>
            </v-btn>
            <v-btn v-else @click="updatePublished(true)" color="primary" small class="mr-2">
                <div v-if="isLoading" class="spinner-border spinner-border-sm"></div>
                <span v-if="isLoading" class="px1">Loading</span>
                <span v-else>Publish</span>
            </v-btn>
            <v-btn color="error" small class="mr-2" @click="deleteTutorial">Delete</v-btn>
            <v-btn color="sucess" small @click="updateTutorial">
                <div v-if="isLoadingUpdate" class="spinner-border spinner-border-sm"></div>
                <span v-if="isLoadingUpdate" class="px1">Loading</span>
                <span v-else>Update</span>
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService"
import Swal from 'sweetalert2'

export default {
    name: "tutorial",
    data() {
        return {
            currentTutorial: null,
            isLoading: false,
            isLoadingUpdate: false,
        }
    },
    methods: {
        getTutorial(id) {

            TutorialDataService.get(id)
                .then((response) => {
                    this.currentTutorial = response.data.data
                }).catch((error) => {
                    console.log(error);
                })
        },
        updatePublished(status) {
            this.isLoading = !false
            const data = {
                id: this.currentTutorial._id,
                title: this.currentTutorial.title,
                description: this.currentTutorial.description,
                published: status
            }

            const id = this.currentTutorial._id
            TutorialDataService.update(id, data)
                .then((response) => {
                    this.currentTutorial.published = status
                    this.isLoading = !true
                }).catch((error) => {
                    console.log(error);
                })
        },

        deleteTutorial() {
            const id = this.currentTutorial._id
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    TutorialDataService.delete(id)
                        .then((response) => {
                            this.$router.push({ name: "tutorials" })
                        }).catch((error) => {
                            console.log(error)
                        })
                    Swal.fire(
                        'Deleted!',
                        'Your Tutorial has been deleted.',
                        'success'
                    )
                }
            })
        },
        updateTutorial() {
            this.isLoadingUpdate = !false
            const id = this.currentTutorial._id
            if (this.currentTutorial.title && this.currentTutorial.description) {
                const data = {
                    title: this.currentTutorial.title,
                    description: this.currentTutorial.description,
                }
                TutorialDataService.update(id, data)
                    .then((response) => {
                        this.isLoadingUpdate = !true
                        this.$router.push({ name: "tutorials" })
                    }).catch((error) => {
                        console.log(error);
                    })
            } else {
                if (!this.currentTutorial.title) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please Enter Title field ',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please Enter Description field ',
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })
                }
            }
            this.isLoadingUpdate = !true


        }
    },
    mounted() {
        this.getTutorial(this.$route.params.id)
    }
}

</script>

<style>
.edit-form {
    max-width: 300px;
}
</style>

