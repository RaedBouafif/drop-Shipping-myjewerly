<?php

/**
 * Knawat MP API Wrapper.
 *
 * @since      1.0.0
 * @author     Dharmesh Patel
 * @package    Knawat
 */

namespace Knawat;


/**
 * Knawat MP API class.
 *
 * @since      1.0.0
 * @category   Class
 * @package    Knawat
 */
class HttpClient
{

    /**
     * Contain Knawat API URL
     * @access private
     */
    private $api_url;

    /**
     * Contain Consumer key
     * @access private
     */
    private $consumer_key = '';

    /**
     * Contain Consumer Secret
     * @access private
     */
    private $consumer_secret = '';

    /**
     * Contain Options related to API
     * @access private
     */
    private $options;

    /**
     * Contain Access Token
     * @access private
     */
    private $access_token = '';

    /**
     * Contain cURL instance
     */
    private $ch;

    /**
     * Initialize Knawat REST API Client
     *
     * @param string $api_url         Knawat REST API URL
     * @param string $consumer_key    Consumer key.
     * @param string $consumer_secret Consumer secret.
     * @param array  $options         Options.
     */
    public function __construct($api_url, $consumer_key, $consumer_secret, $options = array())
    {
        $this->api_url = $api_url;
        $this->consumer_key = $consumer_key;
        $this->consumer_secret = $consumer_secret;
        $default_options = array(
            'verify_ssl' => false,
            'timeout'    => 30,
            'user_agent' => 'Knawat-PHP-SDK- V1.0.1'
        );
        $this->options = array_merge($default_options, $options);
        // Setup Access Token
        $this->access_token = $this->getToken();
    }

    /**
     * Get Token from knawat for API operations.
     *
     * @return string token
     */
    protected function getToken()
    {
        $data = array(
            'consumerKey'   => $this->consumer_key,
            'consumerSecret' => $this->consumer_secret,
        );

        // Instantiate a new instance
        $this->remoteInstance(true);
        // Set the request params
        $this->setUrl('token');
        // Start the request
        $token_data = $this->execute('POST', $data);

        if (isset($token_data->channel) && isset($token_data->channel->token)) {
            $access_token = $token_data->channel->token;
            return $access_token;
        }

        return false;
    }

    /**
     * Get Knawat REST API Access Token
     *
     * @return string $access_token
     */
    public function getAccessToken()
    {
        return $this->access_token;
    }

    /**
     * get function.
     *
     * Performs an API GET request
     *
     * @access public
     * @return object
     */
    public function get($path, $return_array = false)
    {
        // Instantiate a new instance
        $this->remoteInstance();

        // Set the request params
        $this->setUrl($path);

        // Start the request and return the response
        return $this->execute('GET', $return_array);
    }


    /**
     * post function.
     *
     * Performs an API POST request
     *
     * @access public
     * @return object
     */
    public function post($path, $data = array(), $return_array = false)
    {
        // Instantiate a new instance
        $this->remoteInstance();

        // Set the request params
        $this->setUrl($path);

        // Start the request and return the response
        return $this->execute('POST', $data, $return_array);
    }


    /**
     * put function.
     *
     * Performs an API PUT request
     *
     * @access public
     * @return object
     */
    public function put($path, $data = array(), $return_array = false)
    {
        // Instantiate a new instance
        $this->remoteInstance();

        // Set the request params
        $this->setUrl($path);

        // Start the request and return the response
        return $this->execute('PUT', $data, $return_array);
    }

    /**
     * DELETE function.
     *
     * Performs an API DELETE request
     *
     * @access public
     * @return object
     */
    public function delete($path, $data = array(), $return_array = false)
    {
        // Instantiate a new instance
        $this->remoteInstance();

        // Set the request params
        $this->setUrl($path);

        // Start the request and return the response
        return $this->execute('DELETE', $data, $return_array);
    }

    /**
     * setUrl function.
     *
     * Takes an API request string and appends it to the API url
     *
     * @access protected
     * @return void
     */
    protected function setUrl($params)
    {
        curl_setopt($this->ch, CURLOPT_URL, $this->api_url . trim($params, '/'));
    }

    /**
     * remoteInstance function.
     *
     * Create a cURL instance if none exists already
     *
     * @access protected
     * @return cURL object
     */
    protected function remoteInstance($token_request = false)
    {
        if (!function_exists('curl_version')) {
            throw new \Exception('cURL is NOT installed on this server');
        }

        $this->ch = curl_init();
        curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($this->ch, CURLOPT_MAXREDIRS, 10);
        curl_setopt($this->ch, CURLOPT_TIMEOUT, $this->options['timeout']);
        curl_setopt($this->ch, CURLOPT_CONNECTTIMEOUT, $this->options['timeout']);
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, $this->options['verify_ssl']);
        curl_setopt($this->ch, CURLOPT_SSL_VERIFYHOST, $this->options['verify_ssl']);
        $headers = array(
            'Content-Type: application/json',
            'User-Agent: ' . $this->options['user_agent']
        );
        if (!$token_request) {
            $headers[] = 'Authorization: Bearer ' . $this->access_token;
        }
        curl_setopt($this->ch, CURLOPT_HTTPHEADER, $headers);
        return $this->ch;
    }

    /**
     * execute function.
     *
     * Executes the API request
     *
     * @access protected
     * @param  string  $request_type
     * @param  array   $data
     * @param  boolean $return_array - if we want to retrieve an array with additional information.
     * @return object
     */
    protected function execute($request_type, $data = array(), $return_array = false)
    {
        // Set the HTTP request type
        curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, $request_type);

        // Prepare to post the data
        if (is_object($data) || is_array($data)) {
            $data = json_encode($data);
            curl_setopt($this->ch, CURLOPT_POSTFIELDS, $data);
        }

        // Execute the request and decode the response to JSON
        $resource_data = json_decode(curl_exec($this->ch));

        // Retrieve the HTTP response code
        $response_code = (int) curl_getinfo($this->ch, CURLINFO_HTTP_CODE);
        if ($return_array) {
            $response_data = json_encode($resource_data);
            $curl_request_url = curl_getinfo($this->ch, CURLINFO_EFFECTIVE_URL);
            $curl_info = curl_getinfo($this->ch);
        }
        // Close cURL Connection.
        curl_close($this->ch);

        // Everything went well, return the resource data object.
        if ($return_array) {
            return array(
                $resource_data,
                $curl_request_url,
                $data,
                $response_data,
                $curl_info
            );
        }

        return $resource_data;
    }
}
class MP
{

    /**
     * Contain Knawat API URL
     * @access private
     */
    private $api_url = 'https://mp.knawat.io/api/';

    /**
     * Initialize Knawat MP API.
     *
     * @param string $consumer_key    Consumer key.
     * @param string $consumer_secret Consumer secret.
     * @param array  $options         Options.
     */
    public function __construct($consumer_key, $consumer_secret, $options = array())
    {
        $this->client = new HttpClient($this->api_url, $consumer_key, $consumer_secret, $options);
    }

    /**
     * Get Knawat MP Access Token
     *
     * @return string $access_token
     */
    public function getAccessToken()
    {
        return $this->client->getAccessToken();
    }

    /**
     * Get Knawat Products.
     *
     * @param int    $limit Product Limit
     * @param int    $page  Page
     * @param string $last_update UTC Timestamp
     * @return object Knawat Products
     */
    public function getProducts($limit , $page , $last_update = '', $args = array())
    {
        $path = '/catalog/products?limit=' . $limit . '&page=' . $page;
        if (!empty($last_update)) {
            $path .= '&lastupdate=' . $last_update;
        }
        if (!empty($args)) {
            $path .= '&' . http_build_query($args, '', '&');
        }
        return $this->client->get($path);
    }

    /**
     * Count my products
     */
    public function countProducts(){
        $path = '/catalog/products/count';
        return $this->client->get($path);
    }

    /**
     * Get Knawat Product By SKU
     *
     * @param string $sku
     * @return object Knawat Product Object
     */
    public function getProductBySku($sku)
    {
        $path = '/products/' . $sku;
        return $this->client->get($path);
    }

    /**
     * Get Knawat Orders.
     *
     * @param int    $limit Order Limit
     * @param int    $page  Page
     * @return object Knawat Orders
     */
    public function getOrders($limit = 10, $page = 1)
    {
        $path = '/orders?limit=' . $limit . '&page=' . $page;
        return $this->client->get($path);
    }

    /**
     * Get Knawat Order By ID
     *
     * @param string $id
     * @return object Knawat Product Object
     */
    public function getOrderById($id)
    {
        $path = '/orders/' . $id;
        return $this->client->get($path);
    }

    /**
     * Create Sales Order on Knawat API
     *
     * @param array $data
     * @return object
     */
    public function createOrder($data)
    {
        $path = '/orders';
        return $this->client->post($path, $data);
    }

    /**
     * Update Sales Order on Knawat API by Order ID
     *
     * @param string $order_id
     * @param array  $data
     * @return object
     */
    public function updateOrder($order_id, $data)
    {
        $path = '/orders/' . $order_id;
        return $this->client->put($path, $data);
    }

    /*
    add product to my product
    */
    public function addToMyProduct($data)
    {
        $path = "/async/catalog/products";
        return $this->client->post($path, $data);
    }

    /*get categories */


    public function getCategories()
    {
        $path = "/catalog/categories?parentId=2616";
        return $this->client->get($path);
    }
    /**
     * get function.
     *
     * Performs an API GET request
     *
     * @access public
     * @return object
     */
    public function get($path, $return_array = false)
    {
        return $this->client->get($path, $return_array);
    }


    /**
     * post function.
     *
     * Performs an API POST request
     *
     * @access public
     * @return object
     */
    public function post($path, $data = array(), $return_array = false)
    {
        return $this->client->post($path, $data, $return_array);
    }


    /**
     * put function.
     *
     * Performs an API PUT request
     *
     * @access public
     * @return object
     */
    public function put($path, $data = array(), $return_array = false)
    {
        return $this->client->put($path, $data, $return_array);
    }

    /**
     * DELETE function.
     *
     * Performs an API DELETE request
     *
     * @access public
     * @return object
     */
    public function delete($path, $data = array(), $return_array = false)
    {
        return $this->client->delete($path, $data, $return_array);
    }
}
// $connect = new MP("8afc2a10-ec3b-11ec-96bc-7d52ad4edc25", "c000646b-fbd9-46e5-9329-937e8385926d");
// $data =
//     [
//         "items" => [
//             ["sku" => "EBE20YBMMKTST001-0015", "quantity" => 1]
//         ],
//         "shipping" => [
//             "first_name" => "baligh",
//             "last_name" => "zoghlami",
//             "address_1" => "hay nasim",
//             "city" => "ben arous",
//             "state" => "Khlidia",
//             "country" => "TN"
//         ]
//     ];

// echo json_encode($connect->createOrder($data));
