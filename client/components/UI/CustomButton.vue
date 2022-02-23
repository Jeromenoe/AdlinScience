<template>
    <button class="button" 
	:class="btnStyle" 
	v-bind="$attrs" 
	v-on="$listeners">
        <slot />
    </button>
</template>

<script>
export default {
    name: "CustomButton",
    props: {
        btnStyle: {
            type: String,
            default: "",
        },
    },
};
</script>

<style scoped>
.button {
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 6px 6px;
    transition-duration: 0.4s;
    cursor: pointer;
}

.rooms {
    background-color: white;
    color: black;
    border: 1px solid #0070ba;
}

.rooms:hover {
    background-color: #0070ba;
    color: white;
}

.validate {
    background-color: white;
    color: black;
    border: 1px solid #0070ba;
}

.validate:hover {
    background-color: #0070ba;
    color: white;
}

.validate-room {
	background-color: #0070ba;
    color: white;
    border: 1px solid #0070ba;
	border-radius: 2px;
	padding-left: 20px;
	padding-right: 20px;
}

.validate-room:hover {
    background-color: white;
    color: #0070ba;
    border: 1px solid #0070ba;
}

.cancel {
    background-color: white;
    color: black;
    border: 1px solid #f44336;
}

.cancel:hover {
    background-color: #f44336;
    color: white;
}
</style>