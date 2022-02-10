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

.validate {
    background-color: white;
    color: black;
    border: 1px solid #0070ba;
}

.validate:hover {
    background-color: #0070ba;
    color: white;
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