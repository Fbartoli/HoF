
import AlternatingTable from '~/components/AlternatingTable.vue'
export default {
  title: 'AlternatingTable',
  args: {
    table_headers: [
      {
        name: '#',
        align: 'center',
        type: 'rank',
      },
      {
        name: 'name',
        keys: ['name'],
        base_url: 'https://doji.market/',
        url_keys: ['id'],
        shift_index: 1,
        align: 'left',
        type: 'text',
      },
    ],
    table_data: [
      {
        name: "item #1",
        id: 1,

      }
    ],
  }
}

const PrimaryTemplate = (args, { argTypes }) => ({
  components: { AlternatingTable },
  props: Object.keys(argTypes),
  template: `
  <AlternatingTable :table_headers="table_headers" :table_data="table_data" class="h-[500px] max-w-[1000px]" :default_sort_index="0" :rank_sort_index="0" :default_is_asc="false" />
  `
});

export const Primary = PrimaryTemplate.bind({});

// export const NuxtWebsite = () => '<AlternatingTable />'