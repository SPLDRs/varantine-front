<template>
    <div>
        <form enctype="multipart/form-data" novalidate>
             <v-file-input :label="formTitle" :name="uploadFieldName" :disabled="isSaving" 
                @change="filesChange"
                accept="image/*" ></v-file-input>
        </form>
        <!--SUCCESS-->
        <div v-if="isSuccess">
            <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
            <p>
            <a href="javascript:void(0)" @click="reset()">Upload again</a>
            </p>
            <!--<ul class="list-unstyled">
            <li v-for="item in uploadedFiles" :key="item.url">
                <img :src="item.base64" class="img-responsive img-thumbnail" :alt="item.originalName">
            </li>
            </ul>-->
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
            <h2>Uploaded failed.</h2>
            <p>
            <a href="javascript:void(0)" @click="reset()">Try again</a>
            </p>
            <pre>{{ uploadError }}</pre>
        </div>
    </div>
</template>
    
<script>
import { mapState, mapActions } from 'vuex'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
    name: 'ImageUpload',
    props: {
        id: String,
        formTitle: String,
        uploadFieldName: String,
        uploadFunction: Function,
        callback: Function,
        prevPath: String
    },
    data(){
        return{
            submitted: false,
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            fileCount: 0
        }
    },
    computed: {
        //...mapState({
          //  account: state => state.account,
        //}),
        isInitial() {
            return this.currentStatus === STATUS_INITIAL;
        },
        isSaving() {
            return this.currentStatus === STATUS_SAVING;
        },
        isSuccess() {
            return this.currentStatus === STATUS_SUCCESS;
        },
        isFailed() {
            return this.currentStatus === STATUS_FAILED;
        }
    },
    methods:{
    //--------------------------------------------------------------
        reset() {
            // reset form to initial state
            this.currentStatus = STATUS_INITIAL;
            this.uploadedFiles = [];
            this.uploadError = null;
        },
        save(formData) {
            // upload data to the server
            //console.log(this.uploadedFiles);
            this.currentStatus = STATUS_SAVING;
            this.uploadFunction({id: this.id, prevPath: this.prevPath, formData}).then(x => {
                this.uploadedFiles.push(x);
                //console.log(x); //{url, base64}
                this.currentStatus = STATUS_SUCCESS;
                //TODO not actually working
                if(this.callback){
                    this.callback({id:this.id, prevPath: this.prevPath, image: x});
                }
            })
            .catch(err => {
                console.log(err);
                this.uploadError = err.message;//err.response;
                this.currentStatus = STATUS_FAILED;
            });
        },
        filesChange(file) {
            //= File {name: "wx_camera_1505015307820.jpg", lastModified: 1512265298278, lastModifiedDate: Sat Dec 02 2017 17:41:38 GMT-0800 (Pacific Standard Time), webkitRelativePath: "", size: 328449, …}, fileList = undefined
            let fileList=[file];
            console.log('break');
            // handle file changes
            const formData = new FormData();

            if (!fileList.length) return;

            // append the files to FormData
            Array
            .from(Array(fileList.length).keys())
            .map(x => {
                formData.append(this.uploadFieldName, fileList[x], fileList[x].name);
            });

            // save it
            this.save(formData);
        }
    },

    mounted() {
        this.reset();
    },
}
</script>

<style  scoped>
.dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
}

.input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
}

.dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
}
img{
    width: 30px 
}
</style>
