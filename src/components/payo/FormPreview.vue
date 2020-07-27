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
          <p class="list-item-heading pt-2">{{ title }}</p>
        </div>
        <b-row>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.fullname }}
              <span class="preview__title"> Fullname </span>
            </p>
          </b-colxx>
          <b-colxx>
            <p class="preview preview__text">{{ previewData.staffId || previewData.staff_id }}
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
            <p
              class="preview preview__text"
              v-if="previewData.nature"
            >{{ previewData.nature ? previewData.nature : 'N/A' }}
              <span class="preview__title">Nature of items </span>
            </p>
            <p
              class="preview preview__text"
              v-if="previewData.credit_nature"
            >{{ previewData.credit_nature ? previewData.credit_nature : 'N/A' }}
              <span class="preview__title">Nature Of Loan</span>
            </p>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx>
            <p
              class="preview preview__text"
              v-show="previewAmount"
            >{{ previewAmount | toCurrency }}
              <span class="preview__title"> Loan Amount </span>
            </p>
            <p
              class="preview preview__text"
              v-show="!previewAmount"
            >N/A
              <span class="preview__title"> Loan Amount </span>
            </p>
          </b-colxx>
          <b-colxx>
            <p
              class="preview preview__text"
              v-if="previewData.interest"
            >{{ previewData.interest ? previewData.interest+"%" : 'N/A' }}
              <span class="preview__title">Loan Interest</span>
            </p>
            <p
              class="preview preview__text"
              v-else
            >{{ previewData.loanInterest ? previewData.loanInterest+"%" : 'N/A' }}
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
              v-show="previewData.regular_loan_repayment"
            >{{previewData.regular_loan_repayment | toCurrency }}
              <span class="preview__title">Amount to be repayed</span>
            </p>
          </b-colxx>
          <b-colxx>
            <p
              class="preview preview__text"
              v-if="previewData.tenure"
            >{{ previewData.tenure ? previewData.tenure+" Days" : 'N/A' }}
              <span class="preview__title">Loan Duration </span>
            </p>
            <p
              class="preview preview__text"
              v-if="previewData.repayment_method"
            >{{ previewData.repayment_method ? previewData.repayment_method : 'N/A' }}
              <span class="preview__title">Loan Duration </span>
            </p>
          </b-colxx>
        </b-row>
        <b-row>
          <b-colxx v-show="previewData.displayDate">
            <p class="preview preview__text">{{ previewData.displayDate ? previewData.displayDate : 'N/A' }}
              <span class="preview__title">Loan Commencement Date</span>
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
  props: { user: Object, previewData: Object, title: String },
  components: { SingleLightbox },
  data() {
    return {
      previewAmount: 0
    };
  },
  watch: {
    "previewData.amount": {
      handler: function(amount) {
        this.previewAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN"
        }).format(amount);
      }
    },
    "previewData.loan_amount": {
      handler: function(loan_amount) {
        this.previewAmount = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "NGN"
        }).format(loan_amount);
      }
    }
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