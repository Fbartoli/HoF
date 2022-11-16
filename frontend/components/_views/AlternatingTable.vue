<template>
  <div class="table_container">
    <table class="alt_table">
      <thead class="">
        <tr class="">
          <th v-for="(header, index) in table_headers" :key="`table-h-${index}`" class="" :class="[`text-${header.align}`, is_show_sort_arrow(header) ? 'sort-arrow-padding' : 'default-padding']">
            <div class="">
              <svg
                v-if="is_show_sort_arrow(header)"
                @click="sort_arrow_pressed"
                :class="{
                  'rotate-180': is_asc,
                  'rotate-0': !is_asc,
                  'opacity-0': sort_index != index,
                }"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 10"
                aria-hidden="true"
              >
                <path d="M15 1.2l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <button @click="sort_pressed(index)" class="" :class="{ 'text-accent': sort_index == index }">{{ header.name }}</button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="(item, index) in sorted_table_data" :key="index" class="" :class="{ 'bg-neutral-800': index % 2 === 0 }">
          <template v-for="header in table_headers">
            <!-- table row id -->
            <td v-if="header.type == 'index'" :key="`table-row-a-${header.name}`" class="" :class="[`text-${header.align}`, is_show_sort_arrow(header) ? 'sort-arrow-padding' : 'default-padding']">{{ index + 1 }}</td>
            <!-- item index -->
            <td v-else-if="header.type == 'rank'" :key="`table-row-b-${header.name}`" class="" :class="[`text-${header.align}`, is_show_sort_arrow(header) ? 'sort-arrow-padding' : 'default-padding']">{{ get_index_rank_for(item) + 1 }}</td>
            <!-- number data -->
            <td v-else-if="header.type == 'number'" :key="`table-row-c-${header.name}`" class="td-text" :class="[`text-${header.align}`, is_show_sort_arrow(header) ? 'sort-arrow-padding' : 'default-padding']">{{ header.prefix }}{{ get_value(item, header.keys) | _digits }}{{ header.suffix }}</td>
            <!-- text data -->
            <td v-else-if="header.type == 'text'" :key="`table-row-d-${header.name}`" class="td-text" :class="[`text-${header.align}`, is_show_sort_arrow(header) ? 'sort-arrow-padding' : 'default-padding']">
              <!-- nuxtlink -->
              <NuxtLink v-if="header.nuxt_link_path" :to="{ path: `/${header.nuxt_link_path}/${header.shift_index ? nuxtlink_param_for(header, item) + header.shift_index : nuxtlink_param_for(header, item)}` }" class="underline">{{ header.prefix }}{{ get_value(item, header.keys) }}{{ header.suffix }}</NuxtLink>
              <!-- href link -->
              <a v-else-if="header.url_keys" :href="header.shift_index ? nuxtlink_param_for(header, item) + header.shift_index : nuxtlink_param_for(header, item)" target="_blank" class="">{{ header.prefix }}{{ get_value(item, header.keys) }}{{ header.suffix }}</a>
              <!-- default -->
              <span v-else class="">{{ header.prefix }}{{ get_value(item, header.keys) }}{{ header.suffix }}</span>
            </td>
            <!-- address / ens data -->
            <td v-else-if="header.type == 'address'" :key="`table-row-e-${header.name}`" class="td-text" :class="[`text-${header.align}`, is_show_sort_arrow(header) ? 'sort-arrow-padding' : 'default-padding']">
              <!-- nuxtlink -->
              <NuxtLink v-if="header.nuxt_link_path" :to="{ path: `/${header.nuxt_link_path}/${header.shift_index ? nuxtlink_param_for(header, item) + header.shift_index : nuxtlink_param_for(header, item)}` }" class="underline">{{ get_value(item, header.keys) | _shortenAddress }}</NuxtLink>
              <!-- href link -->
              <a v-else-if="header.url_keys" :href="header.shift_index ? nuxtlink_param_for(header, item) + header.shift_index : nuxtlink_param_for(header, item)" target="_blank" class="">{{ get_value(item, header.keys) | _shortenAddress }}</a>
              <!-- default -->
              <span v-else class="">{{ get_value(item, header.keys) | _shortenAddress }}</span>
            </td>
            <!-- image data -->
            <td v-else-if="header.type == 'image'" :key="`table-row-f-${header.name}`" class="td-image">
              <!-- nuxtlink -->
              <NuxtLink v-if="header.nuxt_link_path" :to="{ path: `/${header.nuxt_link_path}/${header.shift_index ? nuxtlink_param_for(header, item) + header.shift_index : nuxtlink_param_for(header, item)}` }" class="underline">
                <img :src="get_value(item, header.keys)" alt="" class="" />
              </NuxtLink>
              <!-- href link -->
              <a v-else-if="header.url_keys" :href="header.shift_index ? nuxtlink_param_for(header, item) + header.shift_index : nuxtlink_param_for(header, item)" target="_blank" class="">
                <img :src="get_value(item, header.keys)" alt="" class="" />
              </a>
              <!-- default -->
              <img v-else :src="get_value(item, header.keys)" alt="" class="" />
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AlternatingTable",
  //#region example
  //  table_headers_example: [
  //       {
  //         name: 'name',
  //         keys: ['name'],
  //         nuxt_link_path: 'market',
  //         nuxt_link_param_key: 'collection_index',
  //         base_url: 'https://opensea.io',
  //         url_keys: ['seller'],
  //         shift_index: 1,
  //         align: 'left',
  //         type: 'text',
  //         preffix: 'z',
  //         suffix: 'z',
  //       },
  //     ],
  //#endregion
  props: {
    rank_sort_index: Number,
    default_sort_index: Number,
    default_is_asc: Boolean,
    table_headers: Array,
    table_data: Array,
  },
  data() {
    return {
      sort_index: null,
      is_asc: true,
    }
  },
  computed: {
    sorted_table_data() {
      if (this.sort_keys) {
        if (this.table_headers[this.sort_index].type == 'rank') {
          if (this.rank_sort_index) {
            if (this.is_asc) {
              return this.table_data.slice(0, 1000).sort((a, b) => this.get_value(a, this.table_headers[this.rank_sort_index].keys) - this.get_value(b, this.table_headers[this.rank_sort_index].keys))
            } else {
              return this.table_data.slice(0, 1000).sort((a, b) => this.get_value(b, this.table_headers[this.rank_sort_index].keys) - this.get_value(a, this.table_headers[this.rank_sort_index].keys))
            }
          }
          return this.table_data.slice(0, 1000)
        } else if (this.table_headers[this.sort_index].type == 'text') {
          if (this.is_asc) {
            return this.table_data.slice(0, 1000).sort((a, b) => (this.get_value(a, this.sort_keys) > this.get_value(b, this.sort_keys) ? 1 : -1))
          } else {
            return this.table_data.slice(0, 1000).sort((a, b) => (this.get_value(b, this.sort_keys) > this.get_value(a, this.sort_keys) ? 1 : -1))
          }
        } else {
          if (this.is_asc) {
            return this.table_data.slice(0, 1000).sort((a, b) => this.get_value(a, this.sort_keys) - this.get_value(b, this.sort_keys))
          } else {
            return this.table_data.slice(0, 1000).sort((a, b) => this.get_value(b, this.sort_keys) - this.get_value(a, this.sort_keys))
          }
        }
      }
      return this.table_data
    },
    rank_sorted_table_data() {
      if (this.rank_sort_index != null) {
        return this.table_data.slice(0, 1000).sort((a, b) => this.get_value(b, this.table_headers[this.rank_sort_index].keys) - this.get_value(a, this.table_headers[this.rank_sort_index].keys))
      }
      return this.table_data.slice(0, 1000)
    },
    sort_keys() {
      if (this.sort_index != null) {
        return this.table_headers[this.sort_index].keys
      }
      return null
    },
  },
  mounted() {
    if (this.default_sort_index != null) {
      this.sort_index = this.default_sort_index
    }
    if (this.default_is_asc != null) {
      this.is_asc = this.default_is_asc
    }
  },
  methods: {
    get_value(data, keys) {
      var tmp_object = null
      for (const value of keys) {
        if (!tmp_object) {
          const tmp = data[value]
          if (tmp) {
            tmp_object = tmp
          }
        } else {
          const tmp = tmp_object[value]
          if (tmp) {
            tmp_object = tmp
          }
        }
      }
      return tmp_object
    },
    sort_pressed(index) {
      // console.log("index", index)
      if (this.table_headers[index].type == 'index') {
        return
      }
      if (this.sort_keys == this.table_headers[index].keys) {
        this.sort_arrow_pressed()
        return
      }
      this.sort_index = index
      this.is_asc = true
    },
    sort_arrow_pressed() {
      // console.log("swap desc asc")
      this.is_asc = !this.is_asc
    },
    is_show_sort_arrow(header) {
      return header.name && header.type != 'index'
    },
    href_for(header, item) {
      if (header.base_url) {
        return `${header.base_url}/${this.get_value(item, header.url_keys)}`
      }
      return this.get_value(item, header.url_keys)
    },
    nuxtlink_param_for(header, item) {
      return item[header.nuxt_link_param_key]
    },
    get_index_rank_for(item) {
      return this.rank_sorted_table_data.indexOf(item)
    },
  },
}
</script>

<style lang="postcss" scoped>
@import 'style/components/adaptive_font.scss';

.table_container {
  @apply w-full mx-auto mt-8 overflow-x-scroll md:overflow-x-auto overflow-y-scroll;
}

.alt_table {
  @apply relative table-auto border-collapse border-0 w-full;
  thead {
    @apply z-10 bg-background;
    tr {
      @apply sticky top-0;
      th {
        @apply font-bold py-2 adaptive-text-xl font-heading bg-background;
        div {
          @apply inline-flex gap-x-2;
          svg {
            @apply w-3 transition-all duration-200 transform;
          }
        }
        .sort-arrow-padding {
          @apply pr-4;
        }
        .default-padding {
          @apply px-4;
        }
      }
    }
  }
  tbody {
    tr {
      @apply h-8;
      td {
        @apply py-2 border-0;
        a {
          @apply underline;
        }
        img {
          @apply object-contain;
        }
        .sort-arrow-padding {
          @apply pl-5 pr-4;
        }
        .default-padding {
          @apply px-4;
        }
        .td-text {
          @apply px-4;
        }
        .td-image {
          @apply h-16 w-16;
        }
      }
    }
  }
}
</style>