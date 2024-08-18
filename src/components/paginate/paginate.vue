<template>
    <nav>
      <ul class="pagination" v-if="paginateData != null">
        <li class="page-item" :class="{ disabled: paginateData.current_page === 1 }">
          <a
            href=""
            class="page-link"
            @click.prevent="pageChange(paginateData.current_page - 1)"
          >
            &laquo;
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: paginateData.current_page === page }"
          v-for="page in paginateData.last_page"
          :key="page"
        >
          <a href="" class="page-link" @click.prevent="pageChange(page)">
            {{ page }}
          </a>
        </li>
        <li
          class="page-item"
          :class="{
            disabled: paginateData.current_page === paginateData.last_page,
          }"
        >
          <a
            href=""
            class="page-link"
            @click.prevent="pageChange(paginateData.current_page + 1)"
            >&raquo;
          </a>
        </li>
      </ul>
    </nav>
</template>
<script setup>

const props = defineProps(['paginateData']);
const emit = defineEmits(['pageChange']);

const pageChange = ((page) => {
    emit("pageChange", page);
});

</script>
  
<style scoped>
  .pagination {
    display: flex;
    padding-left: 0;
    list-style: none;
    border-radius: 0.25rem;
    font-size: 13px;
  }
  .page-link {
    position: relative;
    display: block;
    padding: 0.5rem 0.75rem;
    margin-left: -1px;
    line-height: 1.25;
    color: #3490dc;
    background-color: #f4f4fe;
    border: 1px solid #f4f4fe;
  }
  .page-link:hover {
    z-index: 2;
    color: #1d68a7;
    text-decoration: none;
    background-color: #0f172a;
    border-color: #0f172a;
    color: white !important;
  }
  .page-link:focus {
    z-index: 3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(52, 144, 220, 0.25);
  }
  .page-item:first-child .page-link {
    margin-left: 0;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
  .page-item:last-child .page-link {
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
  .page-item.active .page-link {
    z-index: 3;
    color: #e9ecef;
    background-color: #3490dc;
    border-color: #3490dc;
  }
  .page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    background-color: #f4f4fe;
    border-color: #f4f4fe;
    opacity: 0.8;
  }
  
  .pagination-lg .page-link {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
    line-height: 1.5;
  }
  .pagination-lg .page-item:first-child .page-link {
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }
  .pagination-lg .page-item:last-child .page-link {
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
  
  .pagination-sm .page-link {
    padding: 0.3rem 0.5rem;
    font-size: 0.7875rem;
    line-height: 1.5;
  }
  .pagination-sm .page-item:first-child .page-link {
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
  }
  .pagination-sm .page-item:last-child .page-link {
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
  
  nav {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .page-item a {
    color: black !important;
  }
  .active a {
    background: none !important;
    border: none !important;
    color: white !important;
  }
  .active {
    background: #313131 !important;
  }
  .page-link:focus {
    box-shadow: none;
  }
</style>
  