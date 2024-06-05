import type { Searchable } from '@/api/types'
import type { Ref } from 'vue'
import type { PageInfo, PaginationProps } from 'tdesign-vue-next'
import { onMounted, reactive, ref } from 'vue'

export const useSearch = <T, K>(api: Searchable<T>, searchKey: K) => {
  const data = <Ref<Array<T>>>ref([])

  const pagination = reactive<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 25
  })

  const loading = ref(false)

  const fetchData = () => {
    loading.value = true
    api
      .list({
        page: pagination.current,
        size: pagination.pageSize,
        total: pagination.total,
        ...searchKey
      })
      .then((res) => {
        data.value = res.data
        pagination.current = res.paging.page
        pagination.pageSize = res.paging.size
        pagination.total = res.paging.total
        loading.value = false
      })
      .catch((error) => {
        loading.value = true
        throw new Error(error)
      })
  }

  const onPageChange = (pageInfo: PageInfo) => {
    pagination.current = pageInfo.current
    pagination.pageSize = pageInfo.pageSize
    fetchData()
  }

  onMounted(fetchData)

  return {
    data,
    pagination,
    loading,
    fetchData,
    onPageChange
  }
}
