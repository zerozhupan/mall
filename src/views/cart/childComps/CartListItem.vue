<template>
  <!-- product外面要包裹两层 -->
  <div>
    <div class="cart-item">
      <div class="item-selector">
        <check-button
          :is-checked="product.checked"
          @click.native="checkClick"
        ></check-button>
      </div>

      <div class="item-img">
        <img :src="product.image" alt="" />
      </div>
      <div class="item-info">
        <div class="item-title">{{ product.title }}</div>
        <div class="item-desc">{{ product.desc }}</div>
        <div class="info-bottom">
          <div class="item-price left">{{ product.realPrice }}</div>
          <div class="item-count right">x {{ product.count }}</div>
        </div>
      </div>
    </div>
    <!-- <ul>
      <li>list1</li>
      <li>list2</li>
      <li>list3</li>
      <li>list4</li>
      <li>list5</li>
      <li>list6</li>
      <li>list7</li>
      <li>list8</li>
      <li>list9</li>
      <li>list10</li>
      <li>list11</li>
      <li>list12</li>
      <li>list13</li>
      <li>list14</li>
      <li>list15</li>
      <li>list16</li>
      <li>list17</li>
      <li>list18</li>
      <li>list19</li>
      <li>list20</li>
      <li>list21</li>
      <li>list22</li>
      <li>list23</li>
      <li>list24</li>
      <li>list25</li>
      <li>list26</li>
      <li>list27</li>
      <li>list28</li>
      <li>list29</li>
      <li>list30</li>
      <li>list31</li>
      <li>list32</li>
      <li>list33</li>
      <li>list34</li>
      <li>list35</li>
      <li>list36</li>
      <li>list37</li>
      <li>list38</li>
      <li>list39</li>
      <li>list40</li>
      <li>list41</li>
      <li>list42</li>
      <li>list43</li>
      <li>list44</li>
      <li>list45</li>
      <li>list46</li>
      <li>list47</li>
      <li>list48</li>
      <li>list49</li>
      <li>list50</li>
      <li>list51</li>
      <li>list52</li>
      <li>list53</li>
      <li>list54</li>
      <li>list55</li>
      <li>list56</li>
      <li>list57</li>
      <li>list58</li>
      <li>list59</li>
      <li>list60</li>
      <li>list61</li>
      <li>list62</li>
      <li>list63</li>
      <li>list64</li>
      <li>list65</li>
      <li>list66</li>
      <li>list67</li>
      <li>list68</li>
      <li>list69</li>
      <li>list70</li>
      <li>list71</li>
      <li>list72</li>
      <li>list73</li>
      <li>list74</li>
      <li>list75</li>
      <li>list76</li>
      <li>list77</li>
      <li>list78</li>
      <li>list79</li>
      <li>list80</li>
      <li>list81</li>
      <li>list82</li>
      <li>list83</li>
      <li>list84</li>
      <li>list85</li>
      <li>list86</li>
      <li>list87</li>
      <li>list88</li>
      <li>list89</li>
      <li>list90</li>
      <li>list91</li>
      <li>list92</li>
      <li>list93</li>
      <li>list94</li>
      <li>list95</li>
      <li>list96</li>
      <li>list97</li>
      <li>list98</li>
      <li>list99</li>
      <li>list100</li>
    </ul> -->
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      temp: 1111,
    };
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked;
    },
  },
  components: {
    CheckButton,
  },
};
</script>
<style scoped>
.cart-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-item input {
  display: block;
  position: relative;
  top: 45px;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>