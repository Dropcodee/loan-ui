<template>
  <b-colxx
    xxs="12"
    lg="6"
    xl="6"
    class="col-right"
  >
    <single-lightbox
      :thumb="user.avatar"
      :large="user.avatar"
      class-name="img-thumbnail card-img social-profile-img"
    />
    <b-card
      class="mb-4"
      no-body
    >
      <b-card-body>
        <div class="text-center pt-4">
          <p class="list-item-heading pt-2">Commodity Loan Application Preview</p>
        </div>
        <b-row>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.fullname }}
              <span class="preview__title"> Fullname </span>
            </p>
          </b-colxx>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.staffId }}
              <span class="preview__title"> Staff ID Number </span>
            </p>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.college }}
              <span class="preview__title"> Working College </span>
            </p>
          </b-colxx>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.department }}
              <span class="preview__title"> Current Department </span>
            </p>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.phone }}
              <span class="preview__title"> Working Phone </span>
            </p>
          </b-colxx>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.nature ? previewData.nature : 'N/A' }}
              <span class="preview__title">Nature of items </span>
            </p>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx>
            <p
              class="preview preview__text"
              v-show="previewData.amount"
            >{{ previewData.amount | toCurrency }}
              <span class="preview__title"> Loan Amount </span>
            </p>
            <p
              class="preview preview__text"
              v-show="!previewData.amount"
            >N/A
              <span class="preview__title"> Loan Amount </span>
            </p>
          </b-colxx>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.interest ? previewData.interest+"%" : 'N/A' }}
              <span class="preview__title">Loan Interest</span>
            </p>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx>
            <p
              class="preview preview__text"
              v-show="previewData.repaymentAmount"
            >{{previewData.repaymentAmount | toCurrency }}
              <span class="preview__title">Amount to be repayed</span>
            </p>
            <p
              class="preview preview__text"
              v-show="!previewData.repaymentAmount"
            > N/A
              <span class="preview__title">Amount to be repayed</span>
            </p>
          </b-colxx>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.tenure ? previewData.tenure+" Days" : 'N/A' }}
              <span class="preview__title">Loan Duration </span>
            </p>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.displayDate ? previewData.displayDate : 'N/A' }}
              <span class="preview__title">Loan Commencement Date</span>
            </p>
          </b-colxx>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.tenure ? previewData.tenure+" Days" : 'N/A' }}
              <span class="preview__title">Loan Guarantors </span>
            </p>
          </b-colxx>
        </b-row>
      </b-card-body>
    </b-card>
    <!-- <b-card class="mb-4" no-body>
                <b-card-body>
                  <b-card-title>{{$t('pages.similar-projects')}}</b-card-title>
                  <gallery-detail />
                </b-card-body>
              </b-card>-->
  </b-colxx>
</template>

<script>
import SingleLightbox from "@/components/Pages/SingleLightbox";
export default {
  props: { user: Object, previewData: Object },
  components: { SingleLightbox },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.preview {
  padding: 5px 0;
  margin-top: 20px;
  &__text {
    font-size: 20px;
    font-weight: 600;
    color: rgb(54, 54, 54);
  }
  &__title {
    display: block;
    font-size: 12px;
    font-style: italic;
    font-weight: 200;
  }
}
</style>