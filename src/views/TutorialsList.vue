<template>
    <v-row align="center" class="list px-3 mx-auto">
        <v-col cols="12" md="8">
            <v-text-field v-model="title" label="Search by Title" @keyup="searchTitle"></v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="4" align="center">
            <v-btn small @click="searchTitle">
                Search
            </v-btn>
        </v-col> -->
        <v-col cols="12" sm="12">
            <v-row>
                <v-col cols="4" sm="3">
                    <v-select v-model="pageSize" :items="pageSizes" label="Items per Page"
                        @change="handlePageSizeChange"></v-select>
                </v-col>
                <v-col cols="12" sm="9">
                    <v-pagination v-model="page" :length="totalPages" total-visible="5" next-icon="mdi-menu-right"
                        prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" sm="12">
            <v-card class="mx-auto" tile>
                <v-card-title>Tutorials</v-card-title>
                <v-data-table :headers="headers" :items="tutorials" disable-pagination :hide-default-footer="true">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
                <v-card-actions v-if="tutorials.length > 0">
                    <v-btn small color="error" @click="removeAllTutorials">
                        Remove All
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import TutorialDataService from "@/services/TutorialDataService";
import Swal from 'sweetalert2'
export default {
    name: 'tutorials-list',
    data() {
        return {
            tutorials: [],
            title: "",
            headers: [
                { text: "Title", align: "start", sortable: false, value: 'title' },
                { text: "description", value: "description", sortable: false },
                { text: "Status", value: "status", sortable: false },
                { text: "Actions", value: "actions", sortable: false },
            ],
            page: 1,
            totalPages: 0,
            pageSize: 3,
            pageSizes: [3, 6, 9]
        };
    },
    methods: {
        getRequestParams(title, page, pageSize) {
            let params = {}
            if (title) {
                params["title"] = title;
            }
            if (page) {
                params["page"] = page - 1;
            }
            if (pageSize) {
                params["size"] = pageSize
            }

            return params
        },
        retrieveTurorials() {
            const params = this.getRequestParams(
                this.title,
                this.page,
                this.pageSize
            )
            TutorialDataService.getAll(params)
                .then((response) => {
                    const { totalPages, data } = response.data;
                    this.tutorials = data.map(this.getDisplayTutorial)
                    this.totalPages = totalPages
                }).catch((error) => {
                    console.log(error)
                });
        },
        refreshList() {
            this.retrieveTurorials();
        },
        handlePageChange(value) {
            this.page = value;
            this.retrieveTurorials()
        },
        handlePageSizeChange(size) {
            this.pageSize = size;
            this.page = 1;
            this.retrieveTurorials();
        },
        removeAllTutorials() {
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
                    TutorialDataService.deleteAll()
                        .then((response) => {
                            this.refreshList()
                        }).catch((error) => {
                            console.log(error);
                        })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })

        },
        searchTitle() {
            TutorialDataService.findByTitle(this.title)
                .then((response) => {
                    const { data } = response.data
                    this.tutorials = data.map(this.getDisplayTutorial)
                }).catch((error) => {
                    console.log(error);
                })
        },
        editTutorial(id) {
            this.$router.push({ name: "tutorial-details", params: { id: id } });
        },
        deleteTutorial(id) {
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
                            this.refreshList()
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
        getDisplayTutorial(tutorial) {
            return {
                id: tutorial._id,
                title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
                description: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
                status: tutorial.status ? "Published" : "Pending",
            }
        }
    },
    mounted() {
        this.retrieveTurorials()
    }

}
</script>

<style>
.list {
    max-width: 750px;
}
</style>